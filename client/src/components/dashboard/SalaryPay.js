import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";

const SalaryPay = ({ net = 0, cra = 0, bonus = 0 }) => {
  const data = {
    labels: ["Bersih", "Kotor", "Bonus"],
    datasets: [
      {
        data: [net, cra, bonus],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107"],
        hoverBackgroundColor: ["#3e8e41", "#1769aa", "#e5a300"],
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
          "Doughnut chart showing Pendapatan Bersih, Pendapatan Kotor, and Bonus",
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
              <h5 className="mb-0">Komposisi Pendapatan Tahunan (Rp)</h5>
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

SalaryPay.propTypes = {
  net: PropTypes.number,
  cra: PropTypes.number,
  bonus: PropTypes.number,
};

export default SalaryPay;
