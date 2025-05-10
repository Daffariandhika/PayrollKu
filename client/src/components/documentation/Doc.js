import React from 'react'
import SearchBar from '../dashboard/SearchBar';
import SideBar from '../dashboard/SideBar';
import Footer from '../dashboard/Footer';

export default () => (
<div id="app">
  <div className="main-wrapper">
    <div className="navbar-bg"></div>
    <SearchBar />
    <SideBar />
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Dokumentasi Perangkat Lunak</h1>
        </div>
        <p>
          <span style={{ fontSize: '2.5rem', color: '#007bff' }}>Halo!</span> Terima kasih telah mengakses dokumentasi ini sebelum menggunakan sistem. Di sini Anda akan menemukan jawaban atas sebagian besar pertanyaan dan pemahaman menyeluruh mengenai cara kerja sistem ini.
        </p>

        <div className="row">
          <div className="col-md-6 card card-body card-warning">
            <h5 className="text-center mb-3">1.0 Sistem Tingkatan Karyawan</h5>
            <p>Sistem ini menggunakan struktur tingkat (level) untuk menghitung gaji karyawan. Oleh karena itu, Anda diwajibkan menambahkan data tingkat sebelum menambahkan karyawan ke sistem.</p>
            <p>Tiga field penting harus diisi untuk menambahkan level baru, dan gaji pokok harus diinput tanpa tanda koma.</p>
            <p>Dari halaman tingkat karyawan, Anda dapat mengedit dan menghapus data level. Namun, level tidak dapat <strong>dihapus</strong> apabila sudah digunakan oleh karyawan yang terdaftar.</p>

            <h6 className="mt-3">1.1 Tunjangan Berdasarkan Level</h6>
            <p>Dari tab level karyawan, Anda dapat menambahkan tunjangan tetap berdasarkan level. </p>
            <p><strong>Catatan:</strong> Tunjangan ini otomatis ditambahkan ke gaji bulanan setiap karyawan yang berada di level tersebut.</p>
            <p>Anda juga dapat menghapus tunjangan yang telah dimasukkan sebelumnya dari tab yang sama.</p>

            <h6 className="mt-3">1.2 Potongan Berdasarkan Level</h6>
            <p>Dari tab level karyawan, Anda juga dapat menambahkan potongan tetap berdasarkan level. </p>
            <p><strong>Catatan:</strong> Potongan ini otomatis dikurangkan dari gaji bulanan karyawan yang berada pada level tersebut.</p>
            <p>Potongan yang telah dimasukkan juga dapat dihapus dari sistem.</p>

            <h6 className="mt-3">1.3 Potongan Tetap</h6>
            <p>Sistem ini menghitung penggajian berdasarkan regulasi perpajakan Indonesia (PPh 21) serta kontribusi BPJS. Potongan tetap mencakup:</p>
            <ul>
              <li><strong>BPJS Kesehatan:</strong> 1% dari gaji karyawan</li>
              <li><strong>BPJS Ketenagakerjaan:</strong> sesuai tarif pemerintah (JHT 2%, JKK, JKM, JP 1%)</li>
              <li><strong>PPh 21:</strong> dihitung berdasarkan Penghasilan Kena Pajak (PKP) dan status PTKP</li>
            </ul>
            <p>Potongan lain yang bersifat internal perusahaan dapat dimasukkan melalui fitur potongan berdasarkan level atau individu.</p>
          </div>

          <div className="col-md-6 card card-body card-warning">
            <h5 className="text-center mb-3">2.0 Profil Karyawan</h5>
            <p>Setelah level karyawan dibuat, Anda dapat membuat profil karyawan baru dengan data lengkap: nama, email aktif, jabatan, departemen, dan level. Semua field wajib diisi.</p>
            <p>Melalui halaman "Lihat Profil", Anda bisa mengedit atau menghapus profil karyawan.</p>

            <h5 className="text-center mb-3">3.0 Pengecualian Gaji</h5>
            <p>Fitur ini memungkinkan penetapan gaji pokok khusus di luar struktur level. Untuk menambahkan pengecualian, diperlukan nama karyawan dan jumlah gaji pokok baru.</p>
            <p>Data pengecualian dapat dilihat atau dihapus kapan saja.</p>

            <h6 className="mt-3">3.1 Pengecualian Lainnya</h6>
            <p>Pengecualian ini berlaku untuk pendapatan tambahan atau potongan khusus bagi karyawan tertentu.</p>
            <p>Jenis pengecualian ini akan mempengaruhi gaji bulanan dan bisa dihapus atau diubah kapan saja.</p>

            <h6 className="mt-3">3.2 Pengecualian Sekali Bayar</h6>
            <p>Fitur ini memungkinkan penambahan pendapatan/potongan satu kali. Wajib memilih bulan pembayaran.</p>
            <p><strong>Catatan:</strong> Pembayaran/potongan ini hanya berlaku pada bulan yang dipilih dan akan dihapus otomatis setelah 12 bulan.</p>
          </div>

          <div className="col-md-12 card card-body card-success">
            <h5 className="text-center mb-3 mt-3">4.0 Dasbor</h5>
            <p>Dasbor menyajikan analitik sistem secara menyeluruh: jumlah admin, karyawan aktif, yang telah dihapus, level, dan pengecualian gaji.</p>
            <p>Diagram garis menampilkan analitik bulanan untuk gaji bruto dan neto. Diagram donat menunjukkan total pembayaran netto, tunjangan, dan lainnya. Diagram pai menunjukkan total pajak, BPJS, dan potongan lain dalam setahun.</p>
            <p>Juga tersedia daftar 5 karyawan terakhir yang terdaftar beserta info dasar mereka.</p>

            <h5 className="text-center mb-3 mt-3">5.0 Penggajian</h5>
            <h6>Laporan Bulanan</h6>
            <p>Modul ini digunakan untuk menghitung dan menghasilkan slip gaji. Slip bisa diunduh, dicetak, atau dikirim ke email karyawan setelah tanggal 21 setiap bulan.</p>

            <h6 className="mt-3">Laporan Lengkap</h6>
            <p>Halaman ini memiliki tiga kontrol utama: gaji lengkap + BPJS, kontribusi BPJS, dan pajak karyawan. Masing-masing menampilkan data lengkap dalam bentuk tabel.</p>
            <p>Data dapat difilter berdasarkan nama, bulan, atau tahun, dan diekspor dalam format Excel.</p>

            <h5 className="text-center mb-3 mt-3">6.0 Hak Akses</h5>
            <h6>Super Administrator</h6>
            <p>Memiliki akses penuh: membuat, mengedit, dan menghapus data.</p>
            <h6>Administrator</h6>
            <p>Secara default, akun baru mendapatkan peran ini dan tidak dapat membuat atau menghapus pengecualian gaji karyawan.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</div>

  )
