import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

const Netpay = ({ net }) => {
const data = {
  labels: [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ],
  datasets: [
    {
      label: "Pendapatan Bersih",
      data: [
        net.jan, net.feb, net.mar, net.apr, net.may, net.jun,
        net.jul, net.aug, net.sep, net.oct, net.nov, net.dec
      ],
      backgroundColor: "rgba(76, 175, 80, 0.1)", // light green fill
      borderColor: "#4CAF50",
      pointBackgroundColor: "#4CAF50",
      pointBorderColor: "#fff",
      pointHoverRadius: 7,
      pointRadius: 5,
      pointHoverBorderColor: "#66BB6A",
      tension: 0.4,
      borderWidth: 3,
      fill: false,
    },
    {
      label: "Pendapatan Kotor",
      data: [
        net.grossJan, net.grossFeb, net.grossMar, net.grossApr, net.grossMay, net.grossJun,
        net.grossJul, net.grossAug, net.grossSep, net.grossOct, net.grossNov, net.grossDec
      ],
      backgroundColor: "rgba(33, 150, 243, 0.1)",
      borderColor: "#2196F3",
      pointBackgroundColor: "#2196F3",
      pointBorderColor: "#fff",
      pointHoverRadius: 7,
      pointRadius: 5,
      pointHoverBorderColor: "#64B5F6",
      tension: 0.4,
      borderWidth: 3,
      fill: false,
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'nearest',
    intersect: false
  },
  plugins: {
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#333",
      bodyColor: "#333",
      borderColor: "#2196F3",
      borderWidth: 1,
      cornerRadius: 10,
      padding: 14,
      bodyFont: { size: 14, weight: "500" },
      titleFont: { size: 13, weight: "600" },
      callbacks: {
        label: (context) => `Rp ${context.raw.toLocaleString("id-ID")}`,
      }
    },
    legend: {
      position: "bottom",
      labels: {
        font: { size: 14, weight: "600" },
        color: "#444",
        usePointStyle: true,
        padding: 20,
        pointStyle: "circle"
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: { size: 13 },
        color: "#555",
        padding: 10,
        callback: value => `Rp ${value.toLocaleString("id-ID")}`
      },
      grid: {
        color: "rgba(0,0,0,0.05)",
        borderDash: [4, 4],
        drawBorder: false
      }
    },
    x: {
      ticks: {
        font: { size: 13 },
        color: "#555",
        padding: 8
      },
      grid: {
        color: "rgba(0,0,0,0.03)",
        borderDash: [4, 4],
        drawBorder: false
      }
    }
  },
  elements: {
    point: {
      hoverBackgroundColor: "#fff",
      hoverBorderWidth: 2
    },
    line: {
      borderCapStyle: 'round'
    }
  }
};

  return (
    <div className="col-12 mt-3">
      <div
        className="card shadow border-0"
        style={{
          minHeight: "440px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #ffffff, #f6f9fc)",
          borderRadius: "4px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
            <div className="card-header bg-primary text-white rounded-top-4">
              <h5 className="mb-0">Pendapatan Pegawai Bulanan (Rp)</h5>
            </div>
        <div
          className="card-body"
          style={{ height: "340px" }}
        >
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

Netpay.propTypes = {
  net: PropTypes.shape({
    jan: PropTypes.number.isRequired,
    feb: PropTypes.number.isRequired,
    mar: PropTypes.number.isRequired,
    apr: PropTypes.number.isRequired,
    may: PropTypes.number.isRequired,
    jun: PropTypes.number.isRequired,
    jul: PropTypes.number.isRequired,
    aug: PropTypes.number.isRequired,
    sep: PropTypes.number.isRequired,
    oct: PropTypes.number.isRequired,
    nov: PropTypes.number.isRequired,
    dec: PropTypes.number.isRequired,
    grossJan: PropTypes.number.isRequired,
    grossFeb: PropTypes.number.isRequired,
    grossMar: PropTypes.number.isRequired,
    grossApr: PropTypes.number.isRequired,
    grossMay: PropTypes.number.isRequired,
    grossJun: PropTypes.number.isRequired,
    grossJul: PropTypes.number.isRequired,
    grossAug: PropTypes.number.isRequired,
    grossSep: PropTypes.number.isRequired,
    grossOct: PropTypes.number.isRequired,
    grossNov: PropTypes.number.isRequired,
    grossDec: PropTypes.number.isRequired
  }).isRequired
};

export default Netpay;
