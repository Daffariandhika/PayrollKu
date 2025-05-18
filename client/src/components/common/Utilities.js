export const months = [
  { name: "January", value: "January", _id: "January" },
  { name: "February", value: "February", _id: "February" },
  { name: "March", value: "March", _id: "March" },
  { name: "April", value: "April", _id: "April" },
  { name: "May", value: "May", _id: "May" },
  { name: "June", value: "June", _id: "June" },
  { name: "July", value: "July", _id: "July" },
  { name: "August", value: "August", _id: "August" },
  { name: "September", value: "September", _id: "September" },
  { name: "October", value: "October", _id: "October" },
  { name: "November", value: "November", _id: "November" },
  { name: "December", value: "December", _id: "December" }
];

export const banks = [
  { name: "Bank Mandiri", value: "Bank Mandiri", _id: "Bank Mandiri" },
  { name: "Bank Central Asia (BCA)", value: "Bank Central Asia (BCA)", _id: "Bank Central Asia (BCA)" },
  { name: "Bank Rakyat Indonesia (BRI)", value: "Bank Rakyat Indonesia (BRI)", _id: "Bank Rakyat Indonesia (BRI)" },
  { name: "Bank Negara Indonesia (BNI)", value: "Bank Negara Indonesia (BNI)", _id: "Bank Negara Indonesia (BNI)" },
  { name: "Bank Syariah Indonesia (BSI)", value: "Bank Syariah Indonesia (BSI)", _id: "Bank Syariah Indonesia (BSI)" },
  { name: "Bank CIMB Niaga", value: "Bank CIMB Niaga", _id: "Bank CIMB Niaga" },
  { name: "Bank Danamon", value: "Bank Danamon", _id: "Bank Danamon" },
  { name: "Bank Permata", value: "Bank Permata", _id: "Bank Permata" },
  { name: "Bank Tabungan Negara (BTN)", value: "Bank Tabungan Negara (BTN)", _id: "Bank Tabungan Negara (BTN)" },
  { name: "Bank OCBC NISP", value: "Bank OCBC NISP", _id: "Bank OCBC NISP" },
  { name: "Bank Mega", value: "Bank Mega", _id: "Bank Mega" },
  { name: "Bank Maybank Indonesia", value: "Bank Maybank Indonesia", _id: "Bank Maybank Indonesia" },
  { name: "Bank Panin", value: "Bank Panin", _id: "Bank Panin" },
  { name: "Bank BTPN", value: "Bank BTPN", _id: "Bank BTPN" },
  { name: "Bank Jago", value: "Bank Jago", _id: "Bank Jago" },
  { name: "Bank BCA Syariah", value: "Bank BCA Syariah", _id: "Bank BCA Syariah" },
  { name: "Bank Sinarmas", value: "Bank Sinarmas", _id: "Bank Sinarmas" },
  { name: "Bank Muamalat", value: "Bank Muamalat", _id: "Bank Muamalat" },
  { name: "Bank KB Bukopin", value: "Bank KB Bukopin", _id: "Bank KB Bukopin" },
  { name: "Bank Woori Saudara", value: "Bank Woori Saudara", _id: "Bank Woori Saudara" }
];

export const status = [
  { name: "TK/0 (Tidak Kawin, 0 Tanggungan)", value: "TK/0", _id: "TK/0" },
  { name: "TK/1 (Tidak Kawin, 1 Tanggungan)", value: "TK/1", _id: "TK/1" },
  { name: "TK/2 (Tidak Kawin, 2 Tanggungan)", value: "TK/2", _id: "TK/2" },
  { name: "TK/3 (Tidak Kawin, 3 Tanggungan)", value: "TK/3", _id: "TK/3" },
  { name: "K/0 (Kawin, 0 Tanggungan)", value: "K/0", _id: "K/0" },
  { name: "K/1 (Kawin, 1 Tanggungan)", value: "K/1", _id: "K/1" },
  { name: "K/2 (Kawin, 2 Tanggungan)", value: "K/2", _id: "K/2" },
  { name: "K/3 (Kawin, 3 Tanggungan)", value: "K/3", _id: "K/3" }
];

export const gender = [
  { name: "Laki-Laki", value: "Laki-Laki", _id: "Laki-Laki" },
  { name: "Perempuan", value: "Perempuan", _id: "Perempuan" }
];

export const roles = [
  {name: "Administrator", value: 0, _id: 0},
  {name: "Super Administrator", value: 1, _id: 1}
]

export const formatMoney = money => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(money);
};
