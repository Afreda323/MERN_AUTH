import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { validate, renderTextField } from "../../util/form.js";
import { login } from "../../actions";
import { Redirect } from "react-router-dom";
import Snackbar from "material-ui/Snackbar";

class Login extends Component {
  state = {
    modal: false
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({modal: true})
    }, 500);
  }
  checkForToken = () => {
    if (this.props.token) {
      this.props.history.replace("/secret");
    }
  };
  render() {
    const {
      login,
      handleSubmit,
      pristine,
      submitting,
      error,
      match
    } = this.props;
    return (
      <div className="wrap">
        {this.checkForToken()}
        <form className="wrap__form" onSubmit={handleSubmit(login)}>
          <h1 className="wrap__form__header">Login</h1>
          <div>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              type="email"
            />
          </div>
          <div>
            <Field
              name="password"
              component={renderTextField}
              label="Password"
              type="password"
            />
          </div>
          <small className="wrap__form__small">
            <Link to="/forgot">Forgot your password?</Link>
          </small>
          <p className="red-text">
            {error &&
              <strong>
                {error}
              </strong>}
          </p>
          <div>
            <RaisedButton
              disabled={submitting}
              type="submit"
              primary
              label="Log in!"
            />
          </div>
          {match.path === "/verified"
            ? <Snackbar
                open={this.state.modal}
                message="Account successfully verified, please log in"
                autoHideDuration={10000}
              />
            : ""}
          <br />
          <small className="wrap__form__small">
            Not a member? <Link to="/signup">Sign Up!</Link>
          </small>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.auth.token };
}

export default connect(mapStateToProps, { login })(
  reduxForm({
    form: "login",
    validate
  })(Login)
);
