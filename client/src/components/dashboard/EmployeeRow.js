import React, { Component } from 'react'

class EmployeeRow extends Component {

  render() {

    const employees = this.props.employeeDetails.map(employee => (
      <tr key={employee._id}>
        <td>{employee.tag}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.designation}</td>
        <td>{employee.department}</td>
      </tr>
    ))

    return (

      <div className="row">
        <div className="col-md-12">
          <div className="card" style={{boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)"}}>
            <div className="card-header bg-primary text-white rounded-top-4">
              <h5 className="mb-0">Daftar 5 Pegawai Baru</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive table-invoice">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Posisi</th>
                      <th>Departmen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EmployeeRow
