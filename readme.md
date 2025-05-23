# PayrollKu

Aplikasi manajemen penggajian karyawan berbasis **MERN Stack** (MongoDB, Express.js, React.js, Node.js), lengkap dengan perhitungan otomatis pajak dan jaminan sosial sesuai regulasi ketenagakerjaan di Indonesia.

---

## Tech Stack

<div align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/CSS-264de4?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/SendGrid-2C9AB7?style=for-the-badge&logo=sendgrid&logoColor=white" />
  <img src="https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
</div>

---

## Fitur Utama

- **Manajemen Level Karyawan**  
  Tambahkan level gaji dengan komponen gaji pokok, tunjangan tetap, dan potongan. Karyawan yang tergabung akan otomatis mengikuti aturan ini.

- **Profil Karyawan**  
  Kelola informasi karyawan: nama, email, jabatan, divisi, dan level.

- **Pengecualian Gaji**  
  Atur gaji, tunjangan, atau potongan khusus untuk karyawan tertentu secara rutin atau sekali (one-off).

- **Perhitungan Otomatis Pajak & BPJS**
  - **PPh 21** berdasarkan tarif progresif sesuai UU 2023.
  - **BPJS Kesehatan (1%)**, **BPJS JHT (1%)**, **BPJS JP (0.5%)** otomatis dihitung dari gaji.

- **Dashboard Statistik**
  - Jumlah pegawai aktif
  - Total bonus, pajak, dan pensiun
  - Grafik penghasilan kotor dan bersih tiap bulan

- **Slip Gaji & Laporan**
  - Unduh / kirim PDF slip gaji via email
  - Berisi semua komponen: gaji, PPh 21, BPJS, tunjangan, dan total potongan
  - Filter laporan berdasarkan bulan, tahun, nama
  - Ekspor laporan ke Excel

- **Hak Akses Pengguna**
  - **Super Admin**: Akses penuh, dapat menghapus data & mengatur pengecualian
  - **Admin**: Akses terbatas, tidak dapat menghapus atau menambah pengecualian

---

## Format Slip Gaji

Slip gaji mengikuti standar regulasi di Indonesia, termasuk:
- Gaji Pokok
- Tunjangan Tetap / Tidak Tetap
- Potongan BPJS Kesehatan & Ketenagakerjaan
- PPh 21 berdasarkan tarif progresif
- Total Potongan & Gaji Bersih (Net Pay)

---

## Cara Menjalankan

```bash
# Clone repositori
git clone https://github.com/Daffariandhika/PayrollKu-App.git
cd PayrollKu-App

# Install dependensi
npm install
cd client && npm install

# Jalankan server & client (di terminal berbeda)
npm start
cd client && npm start
```

## Struktur Proyek

* `client/` – Frontend React.js
* `server.js` – Entry point Express.js
* `routes/`, `controllers/` – API & logika backend
* `models/` – Skema MongoDB (Employee, Payslip, Level, dll.)

## Kontak

Pengembangan oleh Daffa Riandhika.
Email: [muhammaddaffariandhika@gmail.com](mailto:muhammaddaffariandhika@gmail.com)

🇮🇩 Sistem ini dirancang agar sesuai dengan regulasi pajak dan ketenagakerjaan di Indonesia untuk mendukung kebutuhan bisnis lokal.
