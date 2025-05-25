import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMonthly } from '../../../actions/payrollActions';
import Spinner from '../../common/Spinner';
import TextFieldGroup from '../../common/TextFieldGroup';
import Footer from '../../dashboard/Footer';
import SearchBar from '../../dashboard/SearchBar';
import SideBar from '../../dashboard/SideBar';

class WithPension extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      let text = this.state.search.toLowerCase()
      document.querySelectorAll('#search-item').forEach(employee => {
        const item = employee.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
          employee.style.display = 'table-row'
        } else {
          employee.style.display = 'none';
        }
      })
    });
  }

  componentDidMount = () => {
    this.props.getMonthly();
  }

  render() {

    const { payrolls, loading } = this.props.payroll;

    const formatMoney = money => {
      let formatedValue = money
        .toString()
        .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      return formatedValue;
    };

    let payrollContainer;

    let date = new Date();
    const presentMonth = date.toLocaleString("en-us", { month: "long" });

    if (payrolls === null || loading) {
      payrollContainer = <Spinner />
    } else {
      if (Object.keys(payrolls).length > 0) {

        payrollContainer = (
          <div className="card">
            <div className="card-header justify-content-center">
              <h3>Data Slip Pegawai Bulan {presentMonth}</h3>
            </div>
            <div className="card-body">
              <Link to="/payroll/all" className="btn btn-lg btn-warning mb-4">Kembali</Link>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-lg btn-primary mb-4 ml-3"
                table="table-to-xls"
                filename="Data_Lengkap_Pegawai"
                sheet="Data_Lengkap_pegawai"
                buttonText="Download Excel"
              />
              <div className="live-search">
                <TextFieldGroup
                  type="text"
                  name="search"
                  label="Cari Pegawai"
                  placeholder="Nama Pegawai"
                  value={this.state.search}
                  onChange={this.onChange}
                  tabindex="1"
                  className="live-search"
                />
              </div>
              <div className="table-responsive">
                <table className="table table-stripped" id="table-to-xls">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>Departemen</th>
                      <th>Jabatan</th>
                      <th>Posisi</th>
                      <th>Status</th>
                      <th>Gaji Pokok</th>
                      <th>Gaji Kotor</th>
                      <th>Gaji Bersih</th>
                      <th>BPJS Hari Tua</th>
                      <th>BPJS Pensiun</th>
                      <th>BPJS Kesehatan</th>
                      <th>BPJS Hari Tua (Perusahaan)</th>
                      <th>BPJS Pensiun (Perusahaan)</th>
                      <th>BPJS Kesehatan (Perusahaan)</th>
                      <th>Biaya Jabatan</th>
                      <th>PPh</th>
                      <th>Nama Bank</th>
                      <th>Nomor Rekening</th>
                      <th>Nomor BPJS Tenaga Kerja</th>
                      <th>Nomor BPJS Kesehatan</th>
                      <th>NPWP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrolls.payslip.map(payrollItem => (
                      <tr key={payrollItem._id} id="search-item">
                        <td>{payrollItem.name}</td>
                        <td>{payrollItem.department}</td>
                        <td>{payrollItem.level}</td>
                        <td>{payrollItem.designation}</td>
                        <td>{payrollItem.status}</td>
                        <td>{formatMoney(payrollItem.basic.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.grossEarning.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.netPay.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.BPJS.JHT.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.BPJS.JP.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.BPJS.KS.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.BPJS_employer.JHT.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.BPJS_employer.JP.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.BPJS_employer.KS.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.biayaJabatan.toFixed(2))}</td>
                        <td>{formatMoney(payrollItem.tax.toFixed(2))}</td>
                        <td>{payrollItem.bankName}</td>
                        <td>{payrollItem.accountNumber}</td>
                        <td>{payrollItem.bpjsKetenagakerjaanNumber}</td>
                        <td>{payrollItem.bpjsKesehatanNumber}</td>
                        <td>{payrollItem.npwp}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Total</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>{formatMoney(payrolls.basicSum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.grossSum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.netSum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.jhtSum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.jpSum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.ksSum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.jhtCompanySum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.jpCompanySum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.ksCompanySum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.jabatanSum.toFixed(2))}</strong></td>
                      <td><strong>{formatMoney(payrolls.taxSum.toFixed(2))}</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>---</strong></td>
                      <td><strong>---</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      } else {
        payrollContainer = <h4>Slip Periode Ini Belum Dibuat!</h4>
      }
    }
    return (
      <div id="app">
        <div className="main-wrapper">
          <div className="navbar-bg" />
          <SearchBar />
          <SideBar />
          <div className="main-content">
            <section className="section">
              <div className="section-header">
                <h1>Laporan Payroll</h1>
              </div>
              {payrollContainer}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

WithPension.propTypes = {
  getMonthly: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  payroll: state.payroll
})

export default connect(mapStateToProps, { getMonthly })(WithPension);
