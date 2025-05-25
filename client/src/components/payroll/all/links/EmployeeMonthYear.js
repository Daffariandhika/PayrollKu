import React from "react";
import { Link } from "react-router-dom";

const EmployeeMonthYear = () => (
  <div className="card col-md-4">
    <div className="card-body mx-auto">
      <Link
        to="/payroll/all/employeemonthyear"
        className="btn btn-lg btn-primary"
      >
        Record Slip Bulanan
      </Link>
    </div>
  </div>
);

export default EmployeeMonthYear;
