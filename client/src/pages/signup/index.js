import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import {validate} from '../../util/valid.js'
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

class Signup extends Component {
  handleForm = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="wrap">
        <form className="wrap__form" onSubmit={this.handleForm}>
          <h1 className="wrap__form__header">Signup</h1>
          <Field name="email" component={renderTextField} label="Email" />
          <Field name="password" component={renderTextField} label="Password" />
          <Field
            name="confirm"
            component={renderTextField}
            label="Confirm Password"
          />
          <small className="wrap__form__small">
            Already a member? <Link to="/">Log in!</Link>
          </small>
          <br />
          <div>
            <RaisedButton primary label="Sign Up!" />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  // a unique name for the form
  form: "signup",
  validate
})(Signup);
