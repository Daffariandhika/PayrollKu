import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { getLevels } from "../../actions/levelActions";
import { registerEmployee } from "../../actions/employeeActions";
import { banks, status, gender } from "../common/Utilities";
import Spinner from "../common/Spinner";
import Button from "../common/Button";
import {Link} from 'react-router-dom';

class AddEmployee extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      gender: "",
      status: "",
      email: "",
      designation: "",
      department: "",
      level: "",
      stateResidence: "",
      bankName: "",
      accountNumber: "",
      bpjsKetenagakerjaanNumber: "",
      bpjsKesehatanNumber: "",
      npwp: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getLevels();
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

    let bankName = this.state.bankName;
    let status = this.state.status;
    let gender = this.state.gender;
    bankName = bankName.toUpperCase();
    const employeeDetails = {
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
      .registerEmployee(employeeDetails)
      .then(res => {
        if (res.type === "ADD_EMPLOYEE") {
          toast.success("Data Pegawai Berhasil Disimpan!");
          this.setState({
            name: "",
            gender: "",
            status: "",
            email: "",
            designation: "",
            department: "",
            level: "",
            stateResidence: "",
            bankName: "",
            accountNumber: "",
            bpjsKetenagakerjaanNumber: "",
            bpjsKesehatanNumber: "",
            npwp: "",
          });
        }

        loadingBtn.innerHTML = "Submit"
      })
      .catch(err => console.log(err));
  }

  render() {
    const { levels, loading } = this.props.levels;
    const { errors } = this.state;

    let employeeForm;

    if (levels === null || loading) {
      employeeForm = <Spinner />;
    } else {
      if (Object.keys(levels).length > 0) {
        employeeForm = (
          <React.Fragment>
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8 mx-auto">
                <div className="card">
                  <div className="card-header">
                    <h4 className="justify-content-center text-danger">
                      *Seluruh input wajib di isi
                      <p className="btn-primary btn-lg mt-3"><Link to="/employee/upload" className="to-upload">Upload Data Pekerja Dari Excel</Link></p>
                    </h4>
                  </div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <fieldset>
                        <legend className="text-center">
                          Form Data Pegawai Baru
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
                        <SelectListGroup
                          label="Jabatan"
                          placeholder="Jabatan"
                          name="level"
                          value={this.state.level}
                          onChange={this.onChange}
                          error={errors.level}
                          options={levels}
                        />
                      </fieldset>
                      <div className="text-center">
                        <Button
                          type="submit"
                          classnameItems="btn-primary btn-lg"
                          btnName="Submit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        employeeForm = (
          <h4 className="text-danger">
            Belum Terdapat Data Gaji Pokok Jabatan, Tambahkan Minimal Satu Jabatan
          </h4>
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
                <h1>Entri Pegawai Baru</h1>
              </div>
              {employeeForm}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

AddEmployee.propTypes = {
  getLevels: PropTypes.func.isRequired,
  registerEmployee: PropTypes.func.isRequired,
  levels: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  levels: state.levels
});

export default connect(
  mapStateToProps,
  { getLevels, registerEmployee }
)(AddEmployee);
