import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";

const OtherPays = ({ tax = 0, biayaJabatan = 0, BPJS = 0 }) => {
  const data = {
    labels: ["PPH", "Biaya Jabatan", "BPJS"],
    datasets: [
      {
        data: [tax, biayaJabatan, BPJS],
        backgroundColor: ["#444E86", "#00A8E8", "#F8C471"],
        hoverBackgroundColor: ["#2f3870", "#0080b8", "#e5b259"],
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: Rp ${value.toLocaleString("id-ID")}`;
          },
        },
        backgroundColor: "#1f2a36",
        bodyFont: { size: 15 },
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 14,
        cornerRadius: 8,
      },
      legend: {
        position: "bottom",
        labels: {
          font: { size: 14, weight: "600" },
          color: "#2c3e50",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
        },
      },
      aria: {
        enabled: true,
        label:
          "Doughnut chart showing annual deduction composition: Tax, Job Cost, and BPJS",
      },
    },
  };

  return (
    <div className="col-md-6 my-3">
      <div
        className="card shadow border-0"
        style={{
          minHeight: "360px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #ffffff, #f2fbfe)",
          borderRadius: "4px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
            <div className="card-header bg-primary text-white rounded-top-4">
              <h5 className="mb-0">Komposisi Potongan Tahunan (Rp)</h5>
            </div>
        <div
          className="card-body d-flex justify-content-center align-items-center"
          style={{ height: "260px", padding: "24px" }}
        >
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

OtherPays.propTypes = {
  tax: PropTypes.number,
  biayaJabatan: PropTypes.number,
  BPJS: PropTypes.number,
};

export default OtherPays;
