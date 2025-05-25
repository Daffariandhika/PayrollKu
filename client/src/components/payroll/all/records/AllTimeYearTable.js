import ReactHTMLTableToExcel from "react-html-table-to-excel";

const AllTimeYearTable = ({ payslips }) => {
  const formatMoney = money => {
    let formatedValue = money
      .toFixed(2)
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return formatedValue;
  };

  let basicSum = 0;
  let grossSum = 0;
  let netSum = 0;
  let jhtSum = 0;
  let jpSum = 0;
  let ksSum = 0;
  let jhtCompanySum = 0;
  let jpCompanySum = 0;
  let ksCompanySum = 0;
  let taxSum = 0;
  let jabatanSum = 0;
  let deductionSum = 0;

  payslips.forEach(payslipItem => {
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
    deductionSum += payslipItem.totalDeductions;
  });

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="live-search">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-lg btn-primary mt-4 mb-4"
                table="table-to-xls"
                filename={"Slip_Seluruh_Pegawai_Tahun_" + payslips[0].presentYear}
                sheet="Slip_Seluruh_Pegawai_Tahunan"
                buttonText="Download Excel"
              />
            </div>
            <div className="table-responsive">
              <table className="table table-stripped" id="table-to-xls">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Bulan</th>
                    <th>Gaji Pokok</th>
                    <th>Pendapatan Kotor</th>
                    <th>BPJS Hari Tua</th>
                    <th>BPJS Pensiun</th>
                    <th>BPJS Kesehatan</th>
                    <th>BPJS Hari Tua (Perusahaan)</th>
                    <th>BPJS Pensiun (Perusahaan)</th>
                    <th>BPJS Kesehatan (Perusahaan)</th>
                    <th>Biaya Jabatan</th>
                    <th>PPh</th>
                    <th>Total Potongan</th>
                    <th>Pendapatan Bersih</th>
                  </tr>
                </thead>
                <tbody>
                  {payslips.map(payslip => (
                    <tr key={payslip._id}>
                      <td>{payslip.name}</td>
                      <td>{payslip.presentMonth}</td>
                      <td>{formatMoney(payslip.basic)}</td>
                      <td>{formatMoney(payslip.grossEarning)}</td>
                      <td>{formatMoney(payslip.BPJS.JHT)}</td>
                      <td>{formatMoney(payslip.BPJS.JP)}</td>
                      <td>{formatMoney(payslip.BPJS.KS)}</td>
                      <td>{formatMoney(payslip.BPJS_employer.JHT)}</td>
                      <td>{formatMoney(payslip.BPJS_employer.JP)}</td>
                      <td>{formatMoney(payslip.BPJS_employer.KS)}</td>
                      <td>{formatMoney(payslip.biayaJabatan)}</td>
                      <td>{formatMoney(payslip.tax)}</td>
                      <td>{formatMoney(payslip.totalDeductions)}</td>
                      <td>{formatMoney(payslip.netPay)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>---</strong></td>
                    <td><strong>{formatMoney(basicSum)}</strong></td>
                    <td><strong>{formatMoney(grossSum)}</strong></td>
                    <td><strong>{formatMoney(jhtSum)}</strong></td>
                    <td><strong>{formatMoney(jpSum)}</strong></td>
                    <td><strong>{formatMoney(ksSum)}</strong></td>
                    <td><strong>{formatMoney(jhtCompanySum)}</strong></td>
                    <td><strong>{formatMoney(jpCompanySum)}</strong></td>
                    <td><strong>{formatMoney(ksCompanySum)}</strong></td>
                    <td><strong>{formatMoney(jabatanSum)}</strong></td>
                    <td><strong>{formatMoney(taxSum)}</strong></td>
                    <td><strong>{formatMoney(deductionSum)}</strong></td>
                    <td><strong>{formatMoney(netSum)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTimeYearTable;
