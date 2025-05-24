import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEmployee, editEmployee } from "../../actions/employeeActions";
import { getLevels } from "../../actions/levelActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import SelectListGroup from "../common/SelectListGroup";
import Spinner from "../common/Spinner";
import { banks, status, gender } from "../common/Utilities";
import isEmpty from "../../validation/is-empty";
import { toast } from "react-toastify";
import Button from '../common/Button';

class EditEmployee extends Component {
  componentDidMount() {
    this.props.getEmployee(this.props.match.params.id);
    this.props.getLevels();
  }

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      gender: "",
      status: "",
      email: "",
      designation: "",
      department: "",
      level: "",
      levelName: "",
      stateResidence: "",
      bankName: "",
      accountNumber: "",
      bpjsKetenagakerjaanNumber: "",
      bpjsKesehatanNumber: "",
      npwp: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.employee) {
      const employee = nextProps.employee.employee;

      employee.name = !isEmpty(employee.name) ? employee.name : "";
      employee.gender = !isEmpty(employee.gender) ? employee.gender : "";
      employee.status = !isEmpty(employee.status) ? employee.status : "";
      employee.email = !isEmpty(employee.email) ? employee.email : "";
      employee.designation = !isEmpty(employee.designation) ? employee.designation : "";
      employee.department = !isEmpty(employee.department) ? employee.department : "";
      employee.levelName = !isEmpty(employee.levelName) ? employee.levelName : "";
      employee.stateResidence = !isEmpty(employee.stateResidence) ? employee.stateResidence : "";
      employee.bankName = !isEmpty(employee.bankName) ? employee.bankName : "";
      employee.accountNumber = !isEmpty(employee.accountNumber) ? employee.accountNumber : "";
      employee.bpjsKetenagakerjaanNumber = !isEmpty(employee.bpjsKetenagakerjaanNumber) ? employee.bpjsKetenagakerjaanNumber : "";
      employee.bpjsKesehatanNumber = !isEmpty(employee.bpjsKesehatanNumber) ? employee.bpjsKesehatanNumber : "";
      employee.npwp = !isEmpty(employee.npwp) ? employee.npwp : "";

      this.setState({
        name: employee.name,
        gender: employee.gender,
        status: employee.status,
        email: employee.email,
        designation: employee.designation,
        department: employee.department,
        levelName: employee.levelName,
        stateResidence: employee.stateResidence,
        bankName: employee.bankName,
        accountNumber: employee.accountNumber,
        bpjsKetenagakerjaanNumber: employee.bpjsKetenagakerjaanNumber,
        bpjsKesehatanNumber: employee.bpjsKesehatanNumber,
        npwp: employee.npwp
      });
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

    let bankName = this.state.bankName;
    let status = this.state.status;
    let gender = this.state.gender;
    bankName = bankName.toUpperCase();
    const employeeData = {
      name: this.state.name,
      gender,
      status,
      email: this.state.email,
      designation: this.state.designation,
      department: this.state.department,
      level: this.state.level,
      stateResidence: this.state.stateResidence,
      bankName,
      accountNumber: this.state.accountNumber,
      bpjsKetenagakerjaanNumber: this.state.bpjsKetenagakerjaanNumber,
      bpjsKesehatanNumber: this.state.bpjsKesehatanNumber,
      npwp: this.state.npwp
    };

    this.props
      .editEmployee(this.props.match.params.id, employeeData)
      .then(res => {
        if (res.type === "ADD_EMPLOYEE") {
          toast.success("Data Pegawai Berhasil Di Edit!");
          this.setState({
            name: "",
            email: "",
            designation: "",
            department: ""
          });
        }
        loadingBtn.innerHTML = "Submit";
      }
      )
      .catch(err => console.log(err));
  }

  render() {
    const { errors } = this.state;

    const { employee, loading } = this.props.employee;
    const { levels } = this.props.levels;

    let editEmployeeContainer;
    let levelContainer;

    if (levels === null || this.props.levels.loading) {
      levelContainer = <Spinner />;
    } else {
      if (Object.keys(levels).length > 0) {
        levelContainer = (
          <Fragment>
            <strong className="text-warning">
              Jabatan Saat Ini : {this.state.levelName}
            </strong>
            <SelectListGroup
              label="Jabatan"
              placeholder="Jabatan"
              name="level"
              value={this.state.level}
              onChange={this.onChange}
              error={errors.level}
              options={levels}
            />
          </Fragment>
        );
      } else {
        levelContainer = <option>Jabatan Tidak di Temukan</option>;
      }
    }

    if (employee === null || loading) {
      editEmployeeContainer = <Spinner />;
    } else {
      if (employee) {
        editEmployeeContainer = (
          <React.Fragment>
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4 className="justify-content-center text-danger">
                      *Semua input harus di isi
                    </h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <fieldset>
                        <legend className="text-center">
                          Form Edit Data Pegawai
                        </legend>
                        <TextFieldGroup
                          type="text"
                          label="Nama Lengkap"
                          placeholder="Nama Lengkap"
                          name="name"
                          value={this.state.name}
                          error={errors.name}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <SelectListGroup
                          label="Jenis Kelamin"
                          name="gender"
                          value={this.state.gender}
                          onChange={this.onChange}
                          error={errors.gender}
                          options={gender}
                        />

                        <SelectListGroup
                          label="Status"
                          name="status"
                          value={this.state.status}
                          onChange={this.onChange}
                          error={errors.status}
                          options={status}
                        />

                        <TextFieldGroup
                          type="email"
                          label="Email"
                          placeholder="Email"
                          name="email"
                          value={this.state.email}
                          error={errors.email}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          type="text"
                          label="Tempat Tinggal"
                          placeholder="Tempat Tinggal"
                          name="stateResidence"
                          value={this.state.stateResidence}
                          error={errors.stateResidence}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <strong className="text-warning">
                          Nama Bank Saat Ini : {this.state.bankName}
                        </strong>
                        <SelectListGroup
                          label="Nama Bank"
                          name="bankName"
                          value={this.state.bankName}
                          onChange={this.onChange}
                          error={errors.bankName}
                          options={banks}
                        />

                        <TextFieldGroup
                          type="text"
                          label="Nomor Rekening Bank"
                          placeholder="Nomor Rekening Bank"
                          name="accountNumber"
                          value={this.state.accountNumber}
                          error={errors.accountNumber}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          type="text"
                          label="Nomor BPJS Ketenagakerjaan"
                          placeholder="Nomor BPJS Ketenagakerjaan"
                          name="bpjsKetenagakerjaanNumber"
                          value={this.state.bpjsKetenagakerjaanNumber}
                          error={errors.bpjsKetenagakerjaanNumber}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          type="text"
                          label="Nomor BPJS Kesehatan"
                          placeholder="Nomor BPJS Kesehatan"
                          name="bpjsKesehatanNumber"
                          value={this.state.bpjsKesehatanNumber}
                          error={errors.bpjsKesehatanNumber}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        <TextFieldGroup
                          type="text"
                          label="Nomor NPWP"
                          placeholder="Nomor NPWP"
                          name="npwp"
                          value={this.state.npwp}
                          error={errors.npwp}
                          onChange={this.onChange}
                          tabindex="1"
                        />
                        <TextFieldGroup
                          type="text"
                          label="Departemen"
                          placeholder="Departemen"
                          name="department"
                          value={this.state.department}
                          error={errors.department}
                          onChange={this.onChange}
                          tabindex="1"
                        />
                        <TextFieldGroup
                          type="text"
                          label="Posisi"
                          placeholder="Posisi"
                          name="designation"
                          value={this.state.designation}
                          error={errors.designation}
                          onChange={this.onChange}
                          tabindex="1"
                        />

                        {levelContainer}
                      </fieldset>

                      <div className="text-center">
                        <Button classnameItems="btn-primary btn-lg" btnName="Submit" type="submit" />
                        <Link
                          to="/employee/all"
                          className="btn btn-lg btn-warning ml-3"
                        >
                          Kembali
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        editEmployeeContainer = <h4>Employee record not found</h4>;
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
                <h1>Edit Pegawai </h1>
              </div>
              {editEmployeeContainer}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

EditEmployee.propTypes = {
  getEmployee: PropTypes.func.isRequired,
  getLevels: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  employee: state.employees,
  levels: state.levels
});

export default connect(
  mapStateToProps,
  { getEmployee, getLevels, editEmployee }
)(EditEmployee);
