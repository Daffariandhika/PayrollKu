module.exports = function generatePayslipDoc(employeePayslip, formatMoney) {
  const renderCostSection = (title, items, style, color, bgColor) => {
    if (!items?.length) return [];
    return [
      [{ text: title, colSpan: 2, style, fillColor: bgColor, color, margin: [0, 4] }, {}],
      ...items.map(item => [item.name || '-', formatMoney(item.amount)])
    ];
  };

  const formatField = field => field || '-';

  const incomeCosts = employeePayslip.individualcost?.filter(e => e.costType === 'income') || [];
  const deductionCosts = employeePayslip.individualcost?.filter(e => e.costType === 'deduction') || [];
  const oneOffIncomes = employeePayslip.oneOffPaymentArray?.filter(e => e.costType === 'income') || [];
  const oneOffDeductions = employeePayslip.oneOffPaymentArray?.filter(e => e.costType === 'deduction') || [];

  const hasBPJS = !!(
    employeePayslip.BPJS?.JHT ||
    employeePayslip.BPJS?.JP ||
    employeePayslip.BPJS?.KS
  );

  return {
    content: [
      // HEADER
      {
        table: {
          widths: ['*'],
          body: [[
            {
              columns: [
                { text: 'PayrollKu.app', color: 'white', bold: true, fontSize: 22 },
                { text: 'SLIP GAJI', color: 'white', bold: true, fontSize: 18, alignment: 'right' }
              ],
              fillColor: '#1e293b',
              margin: [10, 14]
            }
          ]]
        },
        layout: 'noBorders'
      },

      // EMPLOYEE INFO
      {
        margin: [0, 0],
        table: {
          widths: ['18%', '2%', '30%', '18%', '2%', '30%'],
          body: [
            ['Nama', ':', employeePayslip.name, 'Departemen', ':', employeePayslip.department],
            ['ID Pegawai', ':', employeePayslip.tag, 'Posisi', ':', employeePayslip.designation],
            ['NPWP', ':', formatField(employeePayslip.npwp), 'Jabatan', ':', formatField(employeePayslip.level)],
            ['PTKP', ':', formatField(employeePayslip.status), 'Periode', ':', `${employeePayslip.presentMonth} ${employeePayslip.presentYear}`]
          ].map(row => row.map(cell => typeof cell === 'string' ? { text: cell, style: 'fieldLabel' } : cell))
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0,
          hLineColor: () => '#e0f2fe'
        }
      },

      // EARNINGS & DEDUCTIONS
      {
        columns: [
          {
            width: '50%',
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [{ text: 'PENDAPATAN', colSpan: 2, style: 'sectionHeader', fillColor: '#ecfdf5', color: '#047857', alignment: 'center', margin: [0, 8] }, {}],
                ['Gaji Pokok', formatMoney(employeePayslip.basic)],
                ...renderCostSection('Tunjangan Divisi', employeePayslip.bonuses, 'subHeader', '#047857', '#ecfdf5'),
                ...renderCostSection('Tunjangan Personal', incomeCosts, 'subHeader', '#047857', '#ecfdf5'),
                ...renderCostSection('Tunjangan Sekali', oneOffIncomes, 'subHeader', '#047857', '#ecfdf5'),
                [{ text: 'KONTRIBUSI PERUSAHAAN', colSpan: 2, style: 'sectionHeader', fillColor: '#e0f2fe', color: '#0284c7', alignment: 'center', margin: [0, 8] }, {}],
                ...(employeePayslip.BPJS_employer?.JHT ? [['BPJS JHT (3.7%)', formatMoney(employeePayslip.BPJS_employer.JHT)]] : []),
                ...(employeePayslip.BPJS_employer?.JP ? [['BPJS JP (2%)', formatMoney(employeePayslip.BPJS_employer.JP)]] : []),
                ...(employeePayslip.BPJS_employer?.KS ? [['BPJS Kesehatan (4%)', formatMoney(employeePayslip.BPJS_employer.KS)]] : [])
              ],
            },
            layout: {
              hLineWidth: (i) => (i === 0 ? 0.8 : 0.3),
              vLineWidth: () => 0,
              hLineColor: () => '#99f6e4'
            },
            margin: [0, 0, 0, 20]
          },
          {
            width: '50%',
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [{ text: 'POTONGAN', colSpan: 2, style: 'sectionHeader', fillColor: '#fef2f2', color: '#b91c1c', alignment: 'center', margin: [0, 8] }, {}],
                ...(hasBPJS ? [[{ text: 'Potongan Asuransi', colSpan: 2, style: 'subHeaderRed' }, {}]] : []),
                ...(employeePayslip.BPJS?.JHT ? [['BPJS JHT (2%)', formatMoney(employeePayslip.BPJS.JHT)]] : []),
                ...(employeePayslip.BPJS?.JP ? [['BPJS JP (1%)', formatMoney(employeePayslip.BPJS.JP)]] : []),
                ...(employeePayslip.BPJS?.KS ? [['BPJS Kesehatan (1%)', formatMoney(employeePayslip.BPJS.KS)]] : []),
                ...renderCostSection('Potongan Divisi', employeePayslip.deductables, 'subHeaderRed', '#b91c1c', '#fef2f2'),
                ...renderCostSection('Potongan Personal', deductionCosts, 'subHeaderRed', '#b91c1c', '#fef2f2'),
                ...renderCostSection('Potongan Sekali', oneOffDeductions, 'subHeaderRed', '#b91c1c', '#fef2f2'),
                ...(employeePayslip.tax? [[{ text: 'Pajak', colSpan: 2, style: 'subHeaderRed' }, {}], ['PPh', formatMoney(employeePayslip.tax)],
                ...(employeePayslip.biayaJabatan ? [['Biaya Jabatan', formatMoney(employeePayslip.biayaJabatan)]] : [])] : []),
              ]
            },
            layout: {
              hLineWidth: (i) => (i === 0 ? 0.8 : 0.3),
              vLineWidth: () => 0,
              hLineColor: () => '#fecaca'
            },
            margin: [0, 0, 0, 20]
          },
        ],
        columnGap: 12
      },

      // TOTALS
      {
        columns: [
          {
            width: '50%',
            table: {
              widths: ['*'],
              body: [[
                {
                  text: `Total Pendapatan: ${formatMoney(employeePayslip.grossEarning)}`,
                  bold: true,
                  fillColor: '#ecfdf5',
                  color: '#047857',
                  fontSize: 10,
                  alignment: 'center',
                  margin: [0, 8]
                }
              ]]
            },
            layout: 'noBorders'
          },
          {
            width: '50%',
            table: {
              widths: ['*'],
              body: [[
                {
                  text: `Total Potongan: ${formatMoney(employeePayslip.totalDeductions)}`,
                  bold: true,
                  fillColor: '#fef2f2',
                  color: '#b91c1c',
                  fontSize: 10,
                  alignment: 'center',
                  margin: [0, 8]
                }
              ]]
            },
            layout: 'noBorders'
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // NET PAY
      {
        table: {
          widths: ['*'],
          body: [[
            {
              text: `Take Home Pay: ${formatMoney(employeePayslip.netPay)}`,
              bold: true,
              color: '#ffffff',
              fontSize: 13,
              alignment: 'center',
              fillColor: '#1e293b',
              margin: [0, 14]
            }
          ]]
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 10]
      },

      // BANK INFO
      {
        text: `Pembayaran telah dilakukan ke rekening ${formatField(employeePayslip.bankName)} ${formatField(employeePayslip.accountNumber)}`,
        fontSize: 9,
        italics: true,
        margin: [0, 0, 0, 10]
      },

      // SIGNATURE
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Diterima Oleh', bold: true, fontSize: 10, margin: [0, 0, 0, 60] },
              { text: '(________________________)', fontSize: 10 },
              { text: employeePayslip.name || '', fontSize: 9, margin: [0, 5, 0, 0] }
            ],
            margin: [40, 0, 0, 0]
          },
          {
            width: '50%',
            stack: [
              { text: 'Disetujui Oleh', bold: true, fontSize: 10, alignment: 'right', margin: [0, 0, 0, 60] },
              { text: '(________________________)', fontSize: 10, alignment: 'right' },
              { text: 'HRD', fontSize: 9, alignment: 'right', margin: [0, 5, 0, 0] }
            ],
            margin: [0, 0, 40, 0]
          }
        ],
        margin: [0, 30, 0, 0]
      }
    ],

    styles: {
      fieldLabel: {
        fontSize: 9
      },
      sectionHeader: {
        bold: true,
        fontSize: 12,
        margin: [0, 6]
      },
      subHeader: {
        bold: true,
        fontSize: 9,
        margin: [0, 3]
      },
      subHeaderRed: {
        bold: true,
        fontSize: 9,
        fillColor: '#fef2f2',
        color: '#b91c1c',
        margin: [0, 3]
      },
      subHeaderBlue: {
        bold: true,
        fontSize: 9,
        fillColor: '#e0f2fe',
        color: '#0284c7',
        margin: [0, 3]
      },
    },
    defaultStyle: {
      fontSize: 9,
      color: '#1f2937'
    },
    footer: {
      columns: [
        { text: `Dicetak Pada ${new Date().toLocaleDateString('id-ID')}`, alignment: 'left', fontSize: 8, margin: [40, 0] },
        { text: `${employeePayslip._id}`, alignment: 'right', fontSize: 8, margin: [0, 0, 40, 0] }
      ]
    }
  };
};
