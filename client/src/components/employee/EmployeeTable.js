import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEmployee } from '../../actions/employeeActions';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import TextFieldGroup from '../common/TextFieldGroup';
import Pagination from '../common/Pagination';
import SelectListGroup from '../common/SelectListGroup';

class EmployeeTable extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      currentPage: 1,
      employeePerPage: '20',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      let text = this.state.search.toLowerCase();
      document
        .querySelectorAll('#search-item')
        .forEach((payslipRow) => {
          const item = payslipRow.firstChild.textContent;
          const name = payslipRow.childNodes[1].textContent;
          if (
            item.toLowerCase().indexOf(text) !== -1 ||
            name.toLowerCase().indexOf(text) !== -1
          ) {
            payslipRow.style.display = 'table-row';
          } else {
            payslipRow.style.display = 'none';
          }
        });
    });
  }

  deleteDialog(id) {
    confirmAlert({
      title: 'Hapus pegawai?',
      message: 'Apakah sudah yakin untuk menghapus pegawai ini',
      buttons: [
        {
          label: 'Ya, hapus pegawai!',
          onClick: () => {
            this.props
              .deleteEmployee(id)
              .then((res) => {
                if (res.type === 'DELETE_EMPLOYEE') {
                  toast.success('Data pegawai dihapus!');
                }
              })
              .catch((err) => console.log(err));
          },
        },
        {
          label: 'Tidak, kembali!',
          onClick: () => {},
        },
      ],
    });
  }

  paginate(pageNumber) {
    this.setState({
      currentPage: pageNumber,
    });
  }

  render() {
    const { employees, auth } = this.props;
    const { currentPage, employeePerPage } = this.state;

    const indexOfLastEmployee = currentPage * employeePerPage;
    const indexOfFirstEmployee =
      indexOfLastEmployee - employeePerPage;
    const currentEmployee = employees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    );
    let paginateVisibility = parseInt(employeePerPage);
    let recordGroup = [
      { _id: '5', name: '5' },
      { name: '10', _id: '10' },
      { name: '20', _id: '20' },
      { name: '30', _id: '30' },
    ];

    let employeeDetails = currentEmployee.map((employee) => (
      <tr key={employee._id} id="search-item">
        <td>{employee.tag}</td>
        <td>{employee.name}</td>
        <td>{employee.levelName}</td>
        <td>{employee.department}</td>
        <td>{employee.designation}</td>
        <td>
          <Link
            to={`/employee/view/${employee._id}`}
            className="btn btn-info btn-sm"
          >
            Lihat
          </Link>{' '}
          <Link
            to={`/employee/edit/${employee._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>{' '}
          {auth.user.is_admin === 0 ? null : (
            <button
              className="btn btn-danger btn-sm"
              onClick={this.deleteDialog.bind(this, employee._id)}
            >
              Hapus
            </button>
          )}
        </td>
      </tr>
    ));

    return (
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <TextFieldGroup
                    type="text"
                    name="search"
                    label="Cari Pegawai"
                    placeholder="ID atau Nama pegawai"
                    value={this.state.search}
                    onChange={this.onChange}
                    tabindex="1"
                    className="live-search"
                  />
                </div>
                <div className="col-md-2">
                  <SelectListGroup
                    label="Jumlah Tabel"
                    placeholder="Pilih Jumlah Tabel"
                    name="employeePerPage"
                    value={this.state.employeePerPage}
                    onChange={this.onChange}
                    options={recordGroup}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-stripped" id="table-1">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Jabatan</th>
                      <th>Departmen</th>
                      <th>Posisi</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>{employeeDetails}</tbody>
                </table>
              </div>
              {employees.length < paginateVisibility ? (
                ''
              ) : (
                <Pagination
                  employeePerPage={employeePerPage}
                  totalEmployees={employees.length}
                  paginate={this.paginate.bind(this)}
                  currentPage={currentPage}
                  currentLevel={currentEmployee}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmployeeTable.propTypes = {
  deleteEmployee: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteEmployee })(
  EmployeeTable
);
