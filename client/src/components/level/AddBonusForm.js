import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBonus } from "../../actions/levelActions";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { toast } from "react-toastify";

class AddBonusForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      amount: "",
      level: "",
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount = () => {
    this.refs.addBtn.disabled = true
  }
  

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if(this.state.level !== ''){
        this.refs.addBtn.disabled = false;
      } else {
        this.refs.addBtn.disabled = true;
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const bonusDetails = {
      name: this.state.name,
      amount: this.state.amount,
      level: this.state.level
    };

    let loadingComp = document.createElement("i")
    loadingComp.classList = "fas fa-circle-notch fa-spin"
    this.refs.addBtn.appendChild(loadingComp)

    this.props
      .addBonus(bonusDetails, this.state.level)
      .then(res => {
        if(res.type === 'VIEW_LEVELS'){
          toast.success("Bonus Berhasil Ditambahkan!");
          this.setState({
            name: '',
            amount: '',
            level: ''
          })
          this.refs.addBtn.disabled = true;
        }
        this.refs.addBtn.innerHTML = "Submit "
      })
      .catch(err => console.log(err));
  }

  render() {
    const { errors } = this.state;

    const { levels } = this.props;

    const bonusFormContainer = (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          type="text"
          label="Nama Bonus"
          placeholder="Masukan Nama Bonus"
          name="name"
          value={this.state.name}
          error={errors.name}
          onChange={this.onChange}
          tabindex="1"
        />

        <TextFieldGroup
          type="number"
          label="Jumlah Bonus"
          placeholder="Masukan Jumlah Bonus"
          name="amount"
          value={this.state.amount}
          error={errors.amount}
          onChange={this.onChange}
          tabindex="1"
          info="Tidak Perlu Koma atau Titik"
        />

        <SelectListGroup
          label="Pilih Jabatan"
          placeholder="Pilih Jabatan"
          name="level"
          value={this.state.level}
          onChange={this.onChange}
          error={errors.level}
          options={levels}
        />

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg" ref="addBtn" tabIndex="4">
            Submit {" "}
          </button>
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
          <div className="card-body">{bonusFormContainer}</div>
        </div>
      </div>
    );
  }
}

AddBonusForm.propTypes = {
  addBonus: PropTypes.func.isRequired,
  levels: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBonus }
)(AddBonusForm);
