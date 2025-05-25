import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees } from "../../../../actions/employeeActions";
import { getEmployeeYearlySlip } from "../../../../actions/payrollActions";
import Button from "../../../common/Button";
import SelectListGroup from "../../../common/SelectListGroup";
import Spinner from "../../../common/Spinner";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import SingleEmployeeTable from "./SingleEmployeeTable";

class SingleEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getEmployees();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Memproses "
    loadingBtn.appendChild(loadingComp)

    this.props
      .getEmployeeYearlySlip(this.state.employee)
      .then(res => {
        if (
          res.type === "VIEW_PAYROLL_RECORDS" &&
          Object.keys(res.payload).length === 0
        ) {
          toast.warn("Payslip Record Tidak Ditemukan");
        }

        if (res.type === "GET_ERRORS" && typeof res.payload === "string") {
          toast.error("Mohon Pilih Pegawai");
        }

        loadingBtn.innerHTML = "Cari Payslip"
      })
      .catch(err => console.log(err));
  }

  render() {
    let date = new Date();
    const year = date.getFullYear();

    const { employees, loading } = this.props.employees;
    const { payrollRecords } = this.props.payrollRecords;
    let searchContainer, payslipTableContainer;

    if (employees === null || loading) {
      searchContainer = <Spinner />;
    } else {
      if (Object.keys(employees).length > 0) {
        searchContainer = (
          <div>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="card-body mt-4">
                  <form onSubmit={this.onSubmit}>
                    <SelectListGroup
                      label="Pegawai"
                      placeholder="Pilih Jabatan Pegawai"
                      name="employee"
                      value={this.state.employee}
                      onChange={this.onChange}
                      options={employees}
                    />
                    <div className="text-center mx-auto">
                      <Button
                        type="submit"
                        classnameItems="btn-info btn-lg"
                        btnName="Cari Slip"
                      />

                      <Link
                        to="/payroll/all"
                        className="btn btn-lg btn-warning"
                      >
                        Kembali
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );

        if (payrollRecords === null || this.props.payrollRecords.loading) {
          payslipTableContainer = <Spinner />;
        } else {
          if (Object.keys(payrollRecords).length > 0) {
            payslipTableContainer = (
              <SingleEmployeeTable payrollRecords={payrollRecords} />
            );
          } else {
            payslipTableContainer = "";
          }
        }
      } else {
        searchContainer = <h4>Record Pegawai Tidak Ditemukan Dalam Sistem</h4>;
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

              <h4 className="text-center mt-4">
                Cari Slip Pegawai Tahun {year}
              </h4>
              {searchContainer}
              {payslipTableContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

SingleEmployee.propTypes = {
  getEmployees: PropTypes.func.isRequired,
  employees: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees,
  payrollRecords: state.payroll
});

export default connect(
  mapStateToProps,
  { getEmployees, getEmployeeYearlySlip }
)(SingleEmployee);
