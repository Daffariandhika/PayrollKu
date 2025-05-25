import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { months } from "../common/Utilities";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { addOneOffPayment } from "../../actions/exceptionActions";

class Addoneoffpayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      amount: "",
      employee: "",
      costType: "",
      month: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const exceptionDetails = {
      name: this.state.name,
      amount: this.state.amount,
      employee: this.state.employee,
      costType: this.state.costType,
      month: this.state.month
    };

    this.props
      .addOneOffPayment(exceptionDetails)
      .then(res => {
        if (res.type === "ADD_ONE_OFF_PAYMENT") {
          toast.success("One Off Berhasil ditambahkan!");
          this.setState({
            name: "",
            amount: "",
            employee: "",
            costType: "",
            month: ""
          });
        }
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const { employees } = this.props;

    const options = [
      { name: "Income", value: "income", _id: "income" },
      { name: "Deduction", value: "deduction", _id: "deduction" }
    ];

    const exceptionFormContainer = (
      <form onSubmit={this.onSubmit}>

        <TextFieldGroup
          type="text"
          label="Name"
          placeholder="Masukan Nama One Off"
          name="name"
          value={this.state.name}
          error={errors.name}
          onChange={this.onChange}
          tabindex="1"
        />

        <TextFieldGroup
          type="number"
          label="Jumlah"
          placeholder="Masukan Jumlah"
          name="amount"
          value={this.state.amount}
          error={errors.amount}
          onChange={this.onChange}
          tabindex="1"
          info="Tidak Perlu Koma Atau Titik"
        />

        <SelectListGroup
          label="Pilih Pegawai"
          placeholder="Pilih Pegawai"
          name="employee"
          value={this.state.employee}
          onChange={this.onChange}
          error={errors.employee}
          options={employees}
        />

        <SelectListGroup
          label="Jenis One Off"
          name="costType"
          value={this.state.costType}
          onChange={this.onChange}
          error={errors.costType}
          options={options}
        />

        <SelectListGroup
          label="Dilakukan Bulan"
          name="month"
          value={this.state.month}
          onChange={this.onChange}
          error={errors.month}
          options={months}
        />

        <div className="text-center">
          <Button type="submit" classnameItems="btn-primary btn-lg" btnName="Submit" />
        </div>
      </form>
    );

    return (
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card-header">
            <h4 className="justify-content-center text-danger">
              *Semua Field Harus di Isi
            </h4>
          </div>
          <div className="card-body">
            <p className="text-warning">*One Off Akan dihapus Secara Otomatis Setelah 1 tahun</p>
            {exceptionFormContainer}
            </div>
        </div>
      </div>
    );
  }
}

Addoneoffpayment.propTypes = {
  employees: PropTypes.array.isRequired,
  addOneOffPayment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addOneOffPayment }
)(Addoneoffpayment);
