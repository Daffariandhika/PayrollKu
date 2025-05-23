import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendResetLink } from "../../actions/authActions";
import Button from "../common/Button";
import TextFieldGroup from "../common/TextFieldGroup";

class Forgot extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push("/dashboard");
    }
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userEmail = {
      email: this.state.email
    };

    let loadingBtn = document.querySelector(".loading");
    let loadingComp = document.createElement("i");
    loadingComp.classList = "fas fa-circle-notch fa-spin";
    loadingBtn.innerHTML = "Memproses ";
    loadingBtn.appendChild(loadingComp);

    this.props
      .sendResetLink(userEmail)
      .then(res => {
        if (res.type === "GET_SUCCESS") {
          toast.success("Link untuk reset password berhasil dikirim!, mohon periksa spam email anda") && (loadingBtn.innerHTML = "Reset Password");
        }
        if (res.type === "GET_ERRORS") {
          loadingBtn.innerHTML = "Reset Password";
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { errors } = this.state;

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundImage: `url("/wave3.svg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          id="app"
          style={{
            width: "100%",
            maxWidth: "450px",
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "16px",
            padding: "20px 30px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
            boxSizing: "border-box",
          }}
        >
          <div style={{ textAlign: "right" }}>
            <h2
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: "28px",
                color: "#34395e",
              }}
            >
              Reset Password
            </h2>
            <p className="mx-auto text-warning">
              *Kami akan mengirim link untuk mereset password anda
            </p>
          </div>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              label="Email"
              type="email"
              value={this.state.email}
              name="email"
              onChange={this.onChange}
              error={errors.email}
              tabindex="1"
            />

            <p>
              Ingat Password?<Link to="/"> Login Disini</Link>
            </p>
            <div className="form-group">
              <Button
                type="submit"
                classnameItems="btn-primary btn-lg btn-block"
                btnName="Reset Password"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Forgot.propTypes = {
  sendResetLink: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { sendResetLink }
)(Forgot);
