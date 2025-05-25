import { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from 'react-router-dom';
import TextFieldGroup from "../../../common/TextFieldGroup";

class AllEmployeeTable extends Component {

  constructor() {
    super();

    this.state = {
      search: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      let text = this.state.search.toLowerCase();
      document.querySelectorAll("#search-item").forEach(payslipRow => {
        const item = payslipRow.firstChild.textContent;
        const month = payslipRow.childNodes[1].textContent;
        if (item.toLowerCase().indexOf(text) !== -1 || month.toLowerCase().indexOf(text) !== -1) {
          payslipRow.style.display = "table-row";
        } else {
          payslipRow.style.display = "none";
        }
      });
    });
  }

  render() {

    const formatMoney = money => {
      let formatedValue = money
        .toFixed(2)
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    const { payroll } = this.props;

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

    payroll.forEach(payslipItem => {
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

    let date = new Date();
    const year = date.getFullYear();

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header justify-content-center">
                <h3>Semua Slip Pegawai Tahun {year}</h3>
              </div>
              <div className="card-body">
                <Link to="/payroll/all" className="btn btn-lg btn-warning mt-4 mb-4">
                  Kembali
                </Link>
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button btn btn-lg btn-primary mt-4 mb-4 ml-3"
                  table="table-to-xls"
                  filename={"Data_Lengkap_Slip_Tahun" + payroll[0].presentYear}
                  sheet="Data_Lengkap_Slip_Tahunan"
                  buttonText="Download Excel"
                />
              </div>
              <div className="live-search ml-4">
                <TextFieldGroup
                  type="text"
                  name="search"
                  label="Cari Slip"
                  placeholder="Nama Pegawai atau Bulan"
                  value={this.state.search}
                  onChange={this.onChange}
                  tabindex="1"
                  className="live-search"
                />
              </div>
              <div className="card-body">
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
                      {payroll.map(payslip => (
                        <tr key={payslip._id} id="search-item">
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
      </div>
    );
  }
}

export default AllEmployeeTable;
