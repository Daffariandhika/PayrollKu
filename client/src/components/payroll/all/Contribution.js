import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMonthly } from '../../../actions/payrollActions';
import Spinner from '../../common/Spinner';
import Footer from '../../dashboard/Footer';
import SearchBar from '../../dashboard/SearchBar';
import SideBar from '../../dashboard/SideBar';

class Contribution extends PureComponent {

  componentDidMount = () => {
    this.props.getMonthly()
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

    if (payrolls === null || loading) {
      payrollContainer = <Spinner />
    } else {
      if (Object.keys(payrolls).length > 0) {

        payrollContainer = (
          <div className="card-body">
            <Link to="/payroll/all" className="btn btn-lg btn-warning mb-4">Kembali</Link>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-lg btn-primary mb-4 ml-3"
              table="table-to-xls"
              filename="Pensiunan_Pegawai"
              sheet="Pensiunan_pegawai"
              buttonText="Download Excel" />

            <h4 className="text-center mb-5">Pensiunan Pegawai</h4>
            <div className="table-responsive">
              <table className="table table-stripped" id="table-to-xls">
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Posisi</th>
                    <th>Pensiunan</th>
                  </tr>
                </thead>
                <tbody>
                  {payrolls.payslip.map(payrollItem => (
                    <tr key={payrollItem._id}>
                      <td>{payrollItem.name}</td>
                      <td>{payrollItem.designation}</td>
                      <td>{formatMoney(payrollItem.totalBpjs.toFixed(2))}</td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Sum</strong></td>
                    <td><strong>---</strong></td>
                    <td><strong>{formatMoney(payrolls.contributionSum.toFixed(2))}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      } else {
        payrollContainer = <h4>Slip Belum Dibuat!</h4>
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

Contribution.propTypes = {
  getMonthly: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  payroll: state.payroll
})

export default connect(mapStateToProps, { getMonthly })(Contribution);
