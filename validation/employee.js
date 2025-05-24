const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function EmployeeInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.designation = !isEmpty(data.designation) ? data.designation : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.level = !isEmpty(data.level) ? data.level : "";
  data.stateResidence = !isEmpty(data.stateResidence) ? data.stateResidence : "";
  data.bankName = !isEmpty(data.bankName) ? data.bankName : "";
  data.accountNumber = !isEmpty(data.accountNumber) ? data.accountNumber : "";
  data.bpjsKetenagakerjaanNumber = !isEmpty(data.bpjsKetenagakerjaanNumber) ? data.bpjsKetenagakerjaanNumber : "";
  data.bpjsKesehatanNumber = !isEmpty(data.bpjsKesehatanNumber) ? data.bpjsKesehatanNumber : "";
  data.npwp = !isEmpty(data.npwp) ? data.npwp : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Nama harus 2 sampai 3 karakter";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Nama harus di isi";
  }
  if (validator.isEmpty(data.gender)) {
    errors.gender = "Jenis Kelamin harus di isi";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "status wajib di isi";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email harus di isi";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Format email tidak sesuai";
  }
  if (validator.isEmpty(data.designation)) {
    errors.designation = "Posisi harus di isi";
  }
  if (validator.isEmpty(data.department)) {
    errors.department = "Departmen harus di isi";
  }
  if (validator.isEmpty(data.level)) {
    errors.level = "Jabatan harus di isi";
  }
  if (validator.isEmpty(data.stateResidence)) {
    errors.stateResidence = "Tempat tinggal harus di isi";
  }
  if (validator.isEmpty(data.bankName)) {
    errors.bankName = "Nama bank harus di isi";
  }
  if (validator.isEmpty(data.accountNumber)) {
    errors.accountNumber = "Nomor rekening harus di isi";
  }
  if (validator.isEmpty(data.bpjsKetenagakerjaanNumber)) {
    errors.bpjsKetenagakerjaanNumber = "Nomor BPJS tenaga kerja harus di isi";
  }
  if (validator.isEmpty(data.bpjsKesehatanNumber)) {
    errors.bpjsKesehatanNumber = "Nomor BPJS kesehatan harus di isi";
  }
  if (validator.isEmpty(data.npwp)) {
    errors.npwp = "nomor NPWP harus di isi";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
