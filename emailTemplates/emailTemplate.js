module.exports = userDetails => {
  const name = (userDetails?.name || 'Karyawan').split(' ')[0];
  const fullName = userDetails?.name || 'Nama Tidak Tersedia';
  const employeeId = userDetails?.tag || 'ID Tidak Tersedia';
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString('id-ID', { month: 'long' });

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Slip Gaji Bulanan - PayrollKu.app</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f7;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #333;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(90deg, #536DFE 0%, #6777EF 100%);
      padding: 40px 20px;
      text-align: center;
      color: #fff;
    }

    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: bold;
    }

    .header p {
      margin: 10px 0 0;
      font-size: 16px;
      color: #d7dbff;
    }

    .content {
      padding: 30px 25px;
      font-size: 15px;
      line-height: 1.6;
      color: #444;
    }

    .content p {
      margin: 16px 0;
    }

    .summary-table {
      width: 100%;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin: 25px 0;
      overflow: hidden;
      border-spacing: 0;
    }

    .summary-table th,
    .summary-table td {
      padding: 12px 16px;
      text-align: left;
      vertical-align: top;
    }

    .summary-table th {
      background-color: #f7f8fc;
      font-weight: 600;
      color: #333;
    }

    .summary-table td {
      background-color: #f7f8fc;
      color: #333;
    }

    .footer {
      background-color: #2e2e2e;
      color: #ccc;
      text-align: center;
      font-size: 12px;
      padding: 20px 10px;
    }

    .footer a {
      color: #ccc;
      margin: 0 8px;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 600px) {
      .header h1 {
        font-size: 22px;
      }

      .content {
        padding: 20px 15px;
      }

      .summary-table th,
      .summary-table td {
        padding: 10px 12px;
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <center>
    <table class="container" role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td class="header">
          <h1>Halo, ${name}!</h1>
          <p>Slip gaji Anda untuk bulan ${currentMonth} sudah tersedia</p>
        </td>
      </tr>

      <tr>
        <td class="content">
          <p>Hai ${name},</p>
          <p>Slip gaji Anda untuk periode <strong>${currentMonth} ${currentYear}</strong> telah berhasil dibuat dan terlampir dalam email ini.</p>
          <table class="summary-table" role="presentation">
            <tr>
              <th>Nama Karyawan</th>
              <td>${fullName}</td>
            </tr>
            <tr>
              <th>ID Karyawan</th>
              <td>${employeeId}</td>
            </tr>
            <tr>
              <th>Periode</th>
              <td>${currentMonth} ${currentYear}</td>
            </tr>
          </table>
          <p>Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk <a href="mailto:payrollku.app@gmail.com">menghubungi tim kami</a>. Kami siap membantu Anda kapan saja.</p>
          <p>Salam hangat,<br><strong>Tim PayrollKu.app</strong></p>
        </td>
      </tr>

      <tr>
        <td class="footer">
          &copy; ${currentYear} PayrollKu.app — Semua hak dilindungi undang-undang.<br>
          <a href="#">Lihat di Browser</a> | <a href="mailto:payrollku.app@gmail.com">Hubungi Dukungan</a>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`;
};