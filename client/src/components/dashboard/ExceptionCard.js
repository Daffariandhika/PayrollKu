import React from "react";

const ExceptionCard = ({ dashboard }) => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
    <div
      className="card card-statistic-1"
      style={{boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",}}
      >
      <div className="card-icon bg-warning">
        <i className="fas fa-lightbulb" />
      </div>
      <div className="card-wrap">
        <div className="card-header">
          <h4>Pengecualian</h4>
        </div>
        <div className="card-body">{dashboard.exceptionCount}</div>
      </div>
    </div>
  </div>
);

export default ExceptionCard;
