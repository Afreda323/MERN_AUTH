import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

import { Field, reduxForm } from "redux-form";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    fullWidth
    hintText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />;

class Login extends Component {
  handleForm = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="wrap">
        <form className="wrap__form">
          <h1 className="wrap__form__header">Login</h1>
          <Field name="email" component={renderTextField} label="Email" />
          <Field name="password" component={renderTextField} label="Password" />
          <small className="wrap__form__small">
            Not a member? <Link to="/signup">Sign Up!</Link>
          </small>
          <br />
          <div>
            <RaisedButton primary label="Log in!" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
