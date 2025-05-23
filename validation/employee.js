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
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  if (validator.isEmpty(data.gender)) {
    errors.gender = "gender field is required";
  }
  if (validator.isEmpty(data.status)) {
    errors.status = "status field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.designation)) {
    errors.designation = "Designation field is required";
  }
  if (validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }
  if (validator.isEmpty(data.level)) {
    errors.level = "Level field is required";
  }
  if (validator.isEmpty(data.stateResidence)) {
    errors.stateResidence = "State of residence field is required";
  }
  if (validator.isEmpty(data.bankName)) {
    errors.bankName = "Bank name field is required";
  }
  if (validator.isEmpty(data.accountNumber)) {
    errors.accountNumber = "Account number field is required";
  }
  if (validator.isEmpty(data.bpjsKetenagakerjaanNumber)) {
    errors.bpjsKetenagakerjaanNumber = "BPJS Ketenagakerjaan number field is required";
  }
  if (validator.isEmpty(data.bpjsKesehatanNumber)) {
    errors.bpjsKesehatanNumber = "BPJS Kesehatan number field is required";
  }
  if (validator.isEmpty(data.npwp)) {
    errors.npwp = "NPWP number field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
