const express = require('express');
const router = express.Router();
const passport = require('passport');
const protect = passport.authenticate('jwt', { session: false });
const keys = require('../../config/keys');
const mailer = require('@sendgrid/mail');
const pdfMakePrinter = require('pdfmake/src/printer');
const path = require('path');
const emailTemplate = require('../../emailTemplates/emailTemplate');
const generatePayslipDoc = require('../../utils/docDefinition');
// const redis = require('redis');
// const client = redis.createClient();

//Load models
const Level = require('../../models/Level');
const Employee = require('../../models/Employee');
const Exception = require('../../models/Exception');
const IndividualCost = require('../../models/Individualcost');
const Payslip = require('../../models/Payslip');
const OneOffPayment = require('../../models/Oneoffpayment');

//Montly record validation rules
const monthlyRecord = require('../../validation/monthlyrecord');
const employeeMonthYear = require('../../validation/employeemonthyear');
const monthYear = require('../../validation/monthyear');

const date = new Date();
let presentMonth = date.toLocaleString('en-us', { month: 'long' });
let presentYear = date.getFullYear();

//@route  Get api/payslip/:id
//@desc Get Employee payslip route
//@access Private
router.get('/:id', protect, async (req, res) => {
  if (date.getDate() < 5) {
    return res.status(400).json({ message: 'Laporan Slip Hanya Bisa Dibuat Sesudah Tanggal 5!' });
  }
  try {
    const employee = await Employee.findOne(
      { _id: req.params.id, is_delete: 0 }
    );
    const employeeLevel = await Level.findOne(
      { _id: employee.level, is_delete: 0 }
    );
    const individualCosts = await IndividualCost.find(
      { employee: employee._id, is_delete: 0 }
    );
    const oneOffPayments = await OneOffPayment.find(
      { employee: employee._id, is_delete: 0 }
    );
    const employeeException = await Exception.findOne(
      { employee: employee._id, is_delete: 0 }
    );

    const filteredOneOffPayments = oneOffPayments.filter(
      p => p.month.trim().toLowerCase() === presentMonth.toLowerCase()
    );

    const totalLevelBonuses = employeeLevel.bonuses.reduce(
      (sum, bonus) => sum + bonus.amount, 0
    );
    const totalLevelDeductions = employeeLevel.deductables.reduce(
      (sum, deduction) => sum + deduction.amount, 0
    );

    const totalIndividualIncome = individualCosts.filter(
      c => c.costType === 'income'
    ).reduce((sum, c) => sum + c.amount, 0);
    const totalIndividualDeductions = individualCosts.filter(
      c => c.costType === 'deduction'
    ).reduce((sum, c) => sum + c.amount, 0);

    const currentMonthOneOffIncome = filteredOneOffPayments.filter(
      p => p.costType === 'income'
    ).reduce((sum, p) => sum + p.amount, 0);
    const currentMonthOneOffDeductions = filteredOneOffPayments.filter(
      p => p.costType === 'deduction'
    ).reduce((sum, p) => sum + p.amount, 0);

    const basic = employeeException ? employeeException.amount : employeeLevel.basic;

    const bonuses = totalLevelBonuses + totalIndividualIncome + currentMonthOneOffIncome;

    const grossEarning = basic + bonuses;

    const JHT = basic * 0.02;
    const JHT_employer = basic * 0.037;

    const JP = Math.min(basic, 10248000) * 0.01;
    const JP_employer = Math.min(basic, 10248000) * 0.02;

    const KS = Math.min(basic, 12000000) * 0.01;
    const KS_employer = Math.min(basic, 12000000) * 0.04;

    const totalBpjs = JHT + JP + KS;

    const otherDeductions = totalLevelDeductions + totalIndividualDeductions + currentMonthOneOffDeductions;

    const biayaJabatan = Math.min(grossEarning * 0.05, 500000);

    function getPTKP(status) {
      const ptkpBrackets = [
        {
          limit: 'TK/0',
          value: 54000000
        },
        {
          limit: 'TK/1',
          value: 58500000
        },
        {
          limit: 'TK/2',
          value: 63000000
        },
        {
          limit: 'TK/3',
          value: 67500000
        },
        {
          limit: 'K/0',
          value: 58500000
        },
        {
          limit: 'K/1',
          value: 63000000
        },
        {
          limit: 'K/2',
          value: 67500000
        },
        {
          limit: 'K/3',
          value: 72000000
        }
      ];
      const match = ptkpBrackets.find(
        bracket => bracket.limit === status
      );
      const annualPTKP = match.value;
      return annualPTKP / 12;
    }

    const ptkpBulanan = getPTKP(employee.status);

    const pkpBulanan = Math.max(grossEarning - totalBpjs - biayaJabatan - ptkpBulanan, 0);

    const pkpTahunan = pkpBulanan * 12;

    function getPPH(taxableIncome) {
      let tax = 0;
      const taxBrackets = [
        {
          limit: 60000000,
          rate: 0.05
        },
        {
          limit: 250000000,
          rate: 0.15
        },
        {
          limit: 500000000,
          rate: 0.25
        },
        {
          limit: 5000000000,
          rate: 0.30
        },
        {
          limit: Infinity,
          rate: 0.35
        }
      ];
      let remaining = taxableIncome;
      let prevLimit = 0;
      for (const { limit, rate } of taxBrackets) {
        if (remaining <= 0) break;
        const taxableAtThisRate = Math.min(limit - prevLimit, remaining);
        tax += taxableAtThisRate * rate;
        remaining -= taxableAtThisRate;
        prevLimit = limit;
      }
      return tax;
    }

    const pphTahunan = getPPH(pkpTahunan);

    const tax = pphTahunan / 12;

    const totalDeductable = totalBpjs + otherDeductions + tax + biayaJabatan;

    const netPay = grossEarning - totalDeductable;

    const salarySlip = {
      employeeDetails: employee,
      basic,
      grossEarning,
      level: employeeLevel,
      individualcost: individualCosts,
      oneOffPaymentArray: filteredOneOffPayments,
      biayaJabatan,
      tax,
      totalDeductable: totalDeductable,
      netPay,
      totalBpjs,
      presentMonth,
      presentYear,
      BPJS: {
        JHT,
        JP,
        KS
      },
      BPJS_employer: {
        JHT: JHT_employer,
        JP: JP_employer,
        KS: KS_employer,
      }
    };

    const payslipDetails = {
      basic,
      grossEarning,
      bonuses: employeeLevel.bonuses,
      deductables: employeeLevel.deductables,
      individualcost: individualCosts,
      oneOffPaymentArray: filteredOneOffPayments,
      totalBpjs,
      BPJS: {
        JHT,
        JP,
        KS
      },
      BPJS_employer: {
        JHT: JHT_employer,
        JP: JP_employer,
        KS: KS_employer,
      },
      biayaJabatan,
      tax,
      totalDeductions: totalDeductable,
      netPay,
      employee: employee._id,
      tag: employee.tag,
      name: employee.name,
      status: employee.status,
      email: employee.email,
      designation: employee.designation,
      department: employee.department,
      bankName: employee.bankName,
      accountNumber: employee.accountNumber,
      bpjsKetenagakerjaanNumber: employee.bpjsKetenagakerjaanNumber,
      bpjsKesehatanNumber: employee.bpjsKesehatanNumber,
      npwp: employee.npwp,
      level: employee.levelName,
      presentMonth,
      presentYear,
    };

    await Payslip.findOneAndUpdate(
      { employee: employee._id, presentMonth, presentYear, is_delete: 0 },
      { $set: payslipDetails },
      { upsert: true, new: true }
    );
    return res.json(salarySlip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

//@route  Post api/payslip/send/:id
//@desc Send Employee payslip pdf as email route
//@access Private
router.post('/send/:id', protect, async (req, res) => {
  const now = new Date();
  const presentMonth = now.toLocaleString('default', { month: 'long' });
  const presentYear = now.getFullYear();

  try {
    const employeePayslip = await Payslip.findOne({
      employee: req.params.id,
      is_delete: 0,
      presentMonth,
      presentYear
    });

    if (!employeePayslip) {
      return res.status(404).json({ message: 'Slip Tidak Ditemukan' });
    }

    const formatMoney = (money) =>
      parseFloat(money || 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

    const docDefinition = generatePayslipDoc(employeePayslip, formatMoney);

    generatePdf(docDefinition, (response) => {
      const mailData = {
        from: 'muhammaddaffariandhika@gmail.com',
        to: employeePayslip.email,
        subject: 'Slip Gaji Bulanan',
        html: emailTemplate(employeePayslip),
        attachments: [
          {
            content: response,
            filename: 'payslip.pdf',
            type: 'application/pdf',
            disposition: 'attachment'
          }
        ]
      };

      mailer.send(mailData)
        .then(() => res.json({ message: 'Slip Berhasil Dikirim!' }))
        .catch(err => res.status(400).json({ message: 'Error Saat Mengirim Slip', error: err.message }));
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

//@route  GET api/payslip/record/allmothlyslip
//@desc Get all Employees monthly payslip route
//@access Private
router.get('/record/allmonthlyslip', protect, (req, res) => {
  let basicSum = 0,
    grossSum = 0,
    netSum = 0,
    jhtSum = 0,
    jpSum = 0,
    ksSum = 0,
    jhtCompanySum = 0,
    jpCompanySum = 0,
    ksCompanySum = 0,
    taxSum = 0,
    jabatanSum = 0,
    contributionSum = 0;

  Payslip.find({ is_delete: 0 })
    .where('presentMonth')
    .equals(presentMonth)
    .where('presentYear')
    .equals(presentYear)
    .then((payslip) => {
      payslip.forEach((payslipItem) => {
        basicSum += payslipItem.basic;
        grossSum += payslipItem.grossEarning;
        netSum += payslipItem.netPay;
        jhtSum += payslipItem.BPJS.JHT;
        jpSum += payslipItem.BPJS.JP;
        ksSum += payslipItem.BPJS.KS;
        jhtCompanySum += payslipItem.BPJS_employer.JHT;
        jpCompanySum += payslipItem.BPJS_employer.JP;
        ksCompanySum += payslipItem.BPJS_employer.KS;
        jabatanSum += payslipItem.biayaJabatan;
        taxSum += payslipItem.tax;
        contributionSum += payslipItem.totalBpjs
      });

      const payrollDetails = {
        basicSum,
        grossSum,
        netSum,
        jhtSum,
        jpSum,
        ksSum,
        jhtCompanySum,
        jpCompanySum,
        ksCompanySum,
        jabatanSum,
        taxSum,
        contributionSum,
        payslip,
      };

      res.json(payrollDetails);
    })
    .catch((err) => console.log(err));
});

//@route  GET api/payslip/record/employeeallslip/:id
//@desc Get single Employee all yearly payslip route
//@access Private
router.get('/record/employeeallslip/:id', protect, (req, res) => {
  const errors = {};

  Payslip.find({ employee: req.params.id }, { is_delete: 0 })
    .where('presentYear')
    .equals(presentYear)
    .then((payslip) => {
      if (!payslip) {
        errors.employee = 'Mohon Pilih Pegawai';
        return res.status(400).json(errors);
      }
      res.json(payslip);
    })
    .catch((err) => console.log(error));
});

//@route  GET api/payslip/record/allyear
//@desc Get all Employees yearly payslips route
//@access Private
router.get('/record/allyear', protect, (req, res) => {
  const errors = {};

  Payslip.find({ is_delete: 0 })
    .where('presentYear')
    .equals(presentYear)
    .sort({ name: 1 })
    .then((payslips) => {
      if (!payslips) {
        errors.payslips = 'Slip Tidak Ditemukan';
        return res.status(404).json(errors);
      }
      res.json(payslips);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/singlemonthlyslip
//@desc Get Employee payslip monthly record route
//@access Private
router.post('/record/singlemonthlyslip', protect, (req, res) => {
  const { errors, isValid } = monthlyRecord(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Payslip.findOne({ employee: req.body.employee }, { is_delete: 0 })
    .where('presentMonth')
    .equals(req.body.month)
    .then((monthlySlip) => {
      if (!monthlySlip) {
        errors.monthlyslip =
          "Slip Tidak Ditemukan Atau Belum Dibuat";
        return res.status(404).json(errors);
      }
      res.json(monthlySlip);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/byemployeemonthyear
//@desc Get an employee payslip record by month and year route
//@access Private
router.post('/record/byemployeemonthyear', protect, (req, res) => {
  const { errors, isValid } = employeeMonthYear(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Payslip.findOne({ employee: req.body.employee }, { is_delete: 0 })
    .where('presentYear')
    .equals(req.body.year)
    .where('presentMonth')
    .equals(req.body.month)
    .then((payslipItem) => {
      if (!payslipItem) {
        errors.payslip = "Slip Tidak Ditemukan Atau Belum Dibuat";
        return res.status(404).json(errors);
      }
      res.json(payslipItem);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/bymonthyear
//@desc Get all employee payslip record by month and year route
//@access Private
router.post('/record/bymonthyear', protect, (req, res) => {
  const { errors, isValid } = monthYear(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Payslip.find({ is_delete: 0 })
    .where('presentYear')
    .equals(req.body.year)
    .where('presentMonth')
    .equals(req.body.month)
    .then((payslipItem) => {
      if (!payslipItem) {
        errors.payslips =
          "Slip Tidak Ditemukan Atau Belum Dibuat";
        return res.status(404).json(errors);
      }
      res.json(payslipItem);
    })
    .catch((err) => console.log(err));
});

//@route  POST api/payslip/record/bymonthyear
//@desc Get all employee payslip record by year route
//@access Private
router.post('/record/byyear', protect, (req, res) => {
  const errors = {};

  if (
    req.body.year === undefined ||
    req.body.year === null ||
    req.body.year === ''
  ) {
    errors.year = 'Field Tahun Harus di Isi';
    return res.status(400).json(errors);
  }

  Payslip.find({ is_delete: 0 })
    .where('presentYear')
    .equals(req.body.year)
    .then((payslipItem) => {
      if (!payslipItem || Object.keys(payslipItem).length === 0) {
        errors.payslips =
          "Slip Tidak Ditemukan Atau Belum Dibuat";
        return res.status(404).json(errors);
      }
      res.json(payslipItem);
    })
    .catch((err) => console.log(err));
});

const generatePdf = (
  docDefinition,
  successCallback,
  errorCallback
) => {
  try {
    const fontDescriptors = {
      Roboto: {
        normal: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-Regular.ttf'
        ),
        bold: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-Medium.ttf'
        ),
        italics: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-Italic.ttf'
        ),
        bolditalics: path.join(
          __dirname,
          '../../',
          'fonts',
          '/Roboto-MediumItalic.ttf'
        ),
      },
    };

    const printer = new pdfMakePrinter(fontDescriptors);
    const doc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];
    let result;

    doc.on('data', function (chunk) {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      result = Buffer.concat(chunks);
      successCallback(result.toString('base64'));
    });

    doc.end();
  } catch (err) {
    throw err;
  }
};

module.exports = router;
