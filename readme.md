# 💼 Mern-Payroll-App

Aplikasi manajemen penggajian karyawan berbasis MERN (MongoDB, Express.js, React.js, Node.js) dengan fitur lengkap untuk menghitung gaji otomatis berdasarkan level, tunjangan, potongan, dan ketentuan perpajakan serta jaminan sosial di Indonesia.

## ✨ Fitur Utama

* **Manajemen Level Karyawan**
  Tambahkan level dengan gaji pokok, bonus, dan potongan tetap. Semua karyawan yang terdaftar di level tersebut otomatis mengikuti komponen tersebut.

* **Profil Karyawan**
  Buat dan kelola data karyawan seperti nama lengkap, email, jabatan, divisi, dan level gaji.

* **Pengecualian Gaji**
  Atur gaji pokok, tunjangan, atau potongan khusus untuk karyawan tertentu secara rutin atau sekali (one-off).

* **Perhitungan Otomatis Pajak dan Jaminan Sosial**
  Sistem menghitung secara otomatis:
  - **PPh 21** berdasarkan penghasilan kena pajak dan tarif progresif yang berlaku (UU PPh 2023).
  - **BPJS Kesehatan (1%)** dan **BPJS Ketenagakerjaan (JHT 1%, JP 0.5%)** yang dipotong dari gaji karyawan.

* **Dashboard Statistik**
  Visualisasi data seperti:
  - Jumlah karyawan aktif
  - Nilai total bonus, pajak, pensiun
  - Grafik penghasilan kotor & bersih bulanan

* **Slip Gaji & Laporan**

  - Cetak, unduh PDF, atau kirim slip gaji via email
  - Slip gaji berisi: komponen gaji, PPh 21, BPJS, dan total potongan
  - Filter laporan berdasarkan bulan, nama, atau tahun
  - Ekspor laporan ke format Excel

* **Manajemen Hak Akses**

  - **Super Admin**: Akses penuh untuk semua fitur, termasuk penghapusan data & pembuatan pengecualian gaji
  - **Admin**: Akses terbatas, tidak dapat menghapus data atau menambah pengecualian karyawan

## 📄 Komponen Slip Gaji

Format slip gaji mengikuti standar Indonesia:
- Gaji Pokok
- Tunjangan (jika ada)
- Potongan BPJS Kesehatan & Ketenagakerjaan
- PPh 21 sesuai tarif progresif
- Gaji Bersih (Net Pay)

## 🚀 Cara Menjalankan

```bash
# Clone repositori
git clone https://github.com/Daffariandhika/OnPayroll-App.git
cd OnPayroll-App

# Install dependensi
npm install
cd client && npm install

# Jalankan server & client (di terminal berbeda)
npm start
cd client && npm start
```

## 📂 Struktur Proyek

* `client/` – Frontend React.js
* `server.js` – Entry point Express.js
* `routes/`, `controllers/` – API & logika backend
* `models/` – Skema MongoDB (Employee, Payslip, Level, dll.)

## 📧 Kontak

Pengembangan oleh Daffa Riandhika.
Email: [muhammaddaffariandhika@gmail.com](mailto:muhammaddaffariandhika@gmail.com)