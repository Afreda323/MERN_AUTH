import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { validate, renderTextField } from "../../util/form.js";
import { connect } from "react-redux";
import { signup } from "../../actions";
import Dialog from "material-ui/Dialog";

class Signup extends Component {
  state = {
    modal: true
  };
  checkForToken = () => {
    if (this.props.token) {
      this.props.history.replace("/secret");
    }
  };
  renderModal() {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onClick={() => this.setState({ modal: false })}
      />
    ];
    if (this.props.success === true) {
      return (
        <Dialog
          title="Sign Up verification"
          actions={actions}
          modal={true}
          open={this.state.modal}>
          You will recieve an email, follow the link to activate your account.
        </Dialog>
      );
    }
  }
  render() {
    const {
      signup,
      handleSubmit,
      pristine,
      submitting,
      error,
      success
    } = this.props;

    return (
      <div className="wrap">
        {this.checkForToken()}
        <form className="wrap__form" onSubmit={handleSubmit(signup)}>
          <h1 className="wrap__form__header">Signup</h1>
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
          <div>
            <Field
              name="confirm"
              component={renderTextField}
              label="Confirm Password"
              type="password"
            />
          </div>
          <p className="red-text">
            {error &&
              <strong>
                {error}
              </strong>}
          </p>
          {success
            ? ""
            : <div>
                <RaisedButton type="submit" primary label="Sign Up!" />
              </div>}
              {this.renderModal()}
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
  return {
    token: state.auth.token,
    success: state.auth.success
  };
}

export default connect(mapStateToProps, { signup })(
  reduxForm({
    form: "signup",
    validate
  })(Signup)
);
