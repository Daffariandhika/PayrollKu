import { PDFExport } from "@progress/kendo-react-pdf";
import PropTypes from "prop-types";
import { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees } from "../../../../actions/employeeActions";
import { getEmployeeMonthYear } from "../../../../actions/payrollActions";
import Button from "../../../common/Button";
import SelectListGroup from "../../../common/SelectListGroup";
import Spinner from "../../../common/Spinner";
import TextFieldGroup from "../../../common/TextFieldGroup";
import { months } from "../../../common/Utilities";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import AllTimeSingleTable from "./AllTimeSingleTable";

export class AllTimeSingle extends PureComponent {
  static propTypes = {
    getEmployees: PropTypes.func.isRequired,
    getEmployeeMonthYear: PropTypes.func.isRequired,
    employees: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      employee: "",
      month: "",
      year: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getEmployees();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { employee, month, year } = this.state;
    const payslipData = {
      employee,
      month,
      year
    };

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Fetching payslip "
    loadingBtn.appendChild(loadingComp)

    this.props
      .getEmployeeMonthYear(payslipData)
      .then(res => {
        if (res.type === "GET_ERRORS" && res.payload.payslip) {
          toast.warn(res.payload.payslip);
        }
        loadingBtn.innerHTML = "Get payslip";
      })
      .catch(err => console.log(err));
  }

  exportPDF = () => {
    this.resume.save();
  };

  render() {
    const { errors } = this.state;
    const { employees, loading } = this.props.employees;
    const { employeeMonthYear } = this.props.employeeMonthYear;
    let searchContainer, payslipTableContainer;

    if (employees === null || loading) {
      searchContainer = <Spinner />;
    } else {
      if (Object.keys(employees).length > 0) {
        searchContainer = (
          <div>
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div className="card-body mt-3">
                  <form onSubmit={this.onSubmit}>
                    <SelectListGroup
                      label="Pegawai"
                      placeholder="Masukan Pegawai"
                      name="employee"
                      value={this.state.employee}
                      onChange={this.onChange}
                      options={employees}
                      error={errors.employee}
                    />

                    <SelectListGroup
                      label="Bulan"
                      placeholder="Masukan Bulan"
                      name="month"
                      value={this.state.month}
                      onChange={this.onChange}
                      options={months}
                      error={errors.month}
                    />

                    <TextFieldGroup
                      label="Tahun"
                      type="number"
                      placeholder="Masukan Tahun"
                      name="year"
                      value={this.state.year}
                      onChange={this.onChange}
                      error={errors.year}
                    />

                    <div className="mx-auto text-center">
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

        if (
          employeeMonthYear === null ||
          this.props.employeeMonthYear.loading
        ) {
          payslipTableContainer = <Spinner />;
        } else {
          if (Object.keys(employeeMonthYear).length > 0) {
            payslipTableContainer = (
              <Fragment>
                <PDFExport
                  paperSize={"Letter"}
                  fileName={
                    employeeMonthYear.name +
                    " payslip_" +
                    employeeMonthYear.presentMonth
                  }
                  title={
                    employeeMonthYear.name +
                    " payslip_" +
                    employeeMonthYear.presentMonth
                  }
                  subject=""
                  keywords=""
                  ref={r => (this.resume = r)}
                >
                  <AllTimeSingleTable payroll={employeeMonthYear} />
                </PDFExport>
                <div className="text-center mb-5">
                  <Button
                    classnameItems="btn-lg btn-success"
                    onClick={this.exportPDF}
                    btnName="Download PDF"
                  />
                </div>
              </Fragment>
            );
          } else {
            payslipTableContainer = "";
          }
        }
      } else {
        searchContainer = <h4>Data Pegawai Tidak Ditemukan</h4>;
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
                Cari Slip Berdasarkan Nama, Bulan dan Tahun.
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

const mapStateToProps = state => ({
  employees: state.employees,
  employeeMonthYear: state.payroll,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getEmployees, getEmployeeMonthYear }
)(AllTimeSingle);
