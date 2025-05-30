import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getEmployees } from "../../actions/employeeActions";
import SearchBar from "../dashboard/SearchBar";
import SideBar from "../dashboard/SideBar";
import Footer from "../dashboard/Footer";
import MonthlySalaryTable from './MonthlySalaryTable';
import axios from 'axios';
import { toast } from "react-toastify";
import Button from '../common/Button';

class MonthlySalary extends Component {

  componentDidMount() {
    this.props.getEmployees();
  }

  generateAll(employees){
    let totalEmployees = employees.length
    let completeGeneration = 0;
    let failedGeneration = 0;

    let loadingBtn = document.querySelector('.loading');
    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    loadingBtn.innerHTML = "Memproses "
    loadingBtn.appendChild(loadingComp)

    employees.forEach(employee => {
      axios.get(`/api/payslip/${employee._id}`)
        .then(res => {
          if(res.status === 200){
            completeGeneration++;
          } else {
            failedGeneration++;
          }
          if(completeGeneration === totalEmployees){
            toast.success('Semua Slip Berhasil Dibuat!')
            loadingBtn.innerHTML = "Buat Slip"
          }
          if(failedGeneration !== 0){
            toast.warn(`Gagal Membuat ${failedGeneration} Slip Untuk ${totalEmployees} Pegawai`)
            loadingBtn.innerHTML = "Buat Slip"
          }
        })
        .catch(err => console.log(err))
    })
  }

  render() {

    const { employees, loading } = this.props.employees;

    let employeeTable, generateBtn;
    let date = new Date();
    let salaryDay = date.getDate();

    if (employees === null || loading) {
      employeeTable = <Spinner />;
    } else {
      if (Object.keys(employees).length > 0) {

        employeeTable = <MonthlySalaryTable employees={employees} />;

        if(salaryDay >= 5){
          generateBtn = <Button classnameItems="btn-lg btn-info mb-4" btnName="Buat Slip" onClick={this.generateAll.bind(this, employees)} />
        }
        
      } else {
        employeeTable = <h4>Data Pegawai Tidak Ditemukan!</h4>;
        generateBtn = '';
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
                <h1>Slip Pegawai</h1>
              </div>
              {generateBtn}
              {employeeTable}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

MonthlySalary.propTypes = {
  getEmployees: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  employees: state.employees
});

export default connect(
  mapStateToProps,
  { getEmployees }
)(MonthlySalary);
