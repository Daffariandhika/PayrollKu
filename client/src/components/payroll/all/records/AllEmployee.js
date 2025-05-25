import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { getAllYearlyPayslip } from "../../../../actions/payrollActions";
import Spinner from "../../../common/Spinner";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import AllEmployeeTable from "./AllEmployeeTable";

class AllEmployee extends Component {
  componentDidMount = () => {
    this.props.getAllYearlyPayslip();
  };

  render() {

    const { payrollRecordsYearly, loading } = this.props.payrollRecordsYearly;
    let AllEmployeeSlipContainer;

    if (payrollRecordsYearly === null || loading) {
      AllEmployeeSlipContainer = <Spinner />;
    } else {
      if (Object.keys(payrollRecordsYearly).length > 0) {
        AllEmployeeSlipContainer = (
          <AllEmployeeTable payroll={payrollRecordsYearly} />
        );
      } else {
        AllEmployeeSlipContainer = (
          <h4 className="text-center mt-5">Slip Tidak Ditemukan</h4>
        );
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
              {AllEmployeeSlipContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

AllEmployee.propTypes = {
  getAllYearlyPayslip: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  payrollRecordsYearly: state.payroll
});

export default connect(
  mapStateToProps,
  { getAllYearlyPayslip }
)(AllEmployee);
