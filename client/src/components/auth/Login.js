import { PropTypes } from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";

import Button from "../common/Button";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
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

  onSubmit(e) {
    e.preventDefault();

    let loadingBtn = document.querySelector(".loading");
    let loadingComp = document.createElement("i");
    loadingComp.classList = "fas fa-circle-notch fa-spin";
    loadingBtn.innerHTML = "Memproses ";
    loadingBtn.appendChild(loadingComp);

    const loginData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props
      .loginUser(loginData)
      .then(res => {
        if (res && res.type === "GET_ERRORS") {
          loadingBtn.innerHTML = "Login";
        }
      })
      .catch(err => console.log(err));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
              Sign In
            </h2>
            <p className="mx-auto text-primary">
              Halo!, Selamat Datang Kembali
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
            <TextFieldGroup
              placeholder="Password"
              label="Password"
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.onChange}
              error={errors.password}
              tabindex="1"
            />
            <p>
              Lupa Password?{" "}
              <Link to="/forgot-password">Reset Disini</Link>
            </p>
            <div className="form-group">
              <Button
                type="submit"
                classnameItems="btn-primary btn-lg btn-block"
                btnName="Login"
              />
            </div>
          </form>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#6c757d",
            }}
          >
            <p>
              Belum Punya Akun?{" "}
              <Link to="/register">Buat Disini</Link>
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#999",
            }}
          >
            &copy; PayrollKu 2025. All rights reserved.
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
