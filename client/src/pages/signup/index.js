import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, renderTextField } from "../../util/form.js";
import { connect } from "react-redux";
import { signup } from "../../actions";

class Signup extends Component {
  checkForToken = () => {
    if (this.props.token) {
      this.props.history.replace("/secret");
    }
  };

  render() {
    return (
      <div className="wrap">
        {this.checkForToken}
        <form
          className="wrap__form"
          onSubmit={this.props.handleSubmit(this.props.signup)}>
          <h1 className="wrap__form__header">Signup</h1>
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
            <Field
              name="confirm"
              component={renderTextField}
              label="Confirm Password"
            />
          </div>
          <div>
            <RaisedButton type="submit" primary label="Sign Up!" />
          </div>
          <br />
          <small className="wrap__form__small">
            Already a member? <Link to="/">Log in!</Link>
          </small>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.auth.token };
}

export default connect(mapStateToProps, { signup })(
  reduxForm({
    form: "signup",
    validate
  })(Signup)
);
