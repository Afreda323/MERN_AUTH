import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { validate, renderTextField } from "../../util/form.js";
import { login } from "../../actions";

class Login extends Component {
  componentDidMount() {}
  render() {
    const { login, handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="wrap">
        <form className="wrap__form" onSubmit={handleSubmit(login)}>
          <h1 className="wrap__form__header">Login</h1>
          <div>
            <Field name="email" component={renderTextField} label="Email" />
          </div>
          <div>
            <Field
              name="password"
              component={renderTextField}
              label="Password"
            />
          </div>
          <div>
            <RaisedButton
              disabled={submitting}
              type="submit"
              primary
              label="Log in!"
            />
          </div>
          <br />
          <small className="wrap__form__small">
            Not a member? <Link to="/signup">Sign Up!</Link>
          </small>
        </form>
      </div>
    );
  }
}

export default connect(null, { login })(
  reduxForm({
    form: "login",
    validate
  })(Login)
);
