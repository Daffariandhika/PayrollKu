import PropTypes from "prop-types";
import { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMonthYear } from "../../../../actions/payrollActions";
import Button from "../../../common/Button";
import SelectListGroup from "../../../common/SelectListGroup";
import TextFieldGroup from "../../../common/TextFieldGroup";
import { months } from "../../../common/Utilities";
import SearchBar from "../../../dashboard/SearchBar";
import SideBar from "../../../dashboard/SideBar";
import AllTImeMonthYearTable from "./AllTImeMonthYearTable";

export class AllTimeMonthYear extends PureComponent {
  static propTypes = {
    getMonthYear: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      month: "",
      year: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Memproses "
    loadingBtn.appendChild(loadingComp)

    const { month, year } = this.state;
    const payslipData = {
      month,
      year
    };

    this.props
      .getMonthYear(payslipData)
      .then(res => {
        if (res.type === "VIEW_MONTH_YEAR" && Object.keys(res.payload).length === 0) {
          toast.warn("Slip Tidak Ditemukan atau Belum Dibuat");
        }
        loadingBtn.innerHTML = "Cari Slip"
      })
      .catch(err => console.log(err));
  }

  exportPDF = () => {
    this.resume.save();
  };

  render() {
    const { errors } = this.state;
    const { monthYear } = this.props.monthYear;
    let payslipTableContainer;

    if (monthYear !== null) {
      if (Object.keys(monthYear).length > 0) {
        payslipTableContainer = <AllTImeMonthYearTable payroll={monthYear} />;
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
                Cari Slip Pegawai Berdasarkan Bulan Dan Tahun.
              </h4>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <div className="card-body mt-3">
                    <form onSubmit={this.onSubmit}>
                      <SelectListGroup
                        label="Bulan"
                        placeholder="Pilih Bulan"
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
              {payslipTableContainer}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  monthYear: state.payroll,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getMonthYear }
)(AllTimeMonthYear);
