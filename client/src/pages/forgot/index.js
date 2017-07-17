import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { validate, renderTextField } from "../../util/form.js";
import { forgot } from "../../actions";
import { Redirect } from "react-router-dom";

class Forgot extends Component {
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
      forgot,
      handleSubmit,
      pristine,
      submitting,
      error
    } = this.props;
    return (
      <div className="wrap">
        {this.checkForToken()}
        <form className="wrap__form" onSubmit={handleSubmit(forgot)}>
          <h3 className="wrap__form__header--small">Password Reset</h3>
          <small className="wrap__form__small">
            <p>Please enter your email</p>
          </small>
          
          <div>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              type="email"
            />
          </div>
          <p className="red-text">
            {error &&
              <strong>
                {error}
              </strong>}
          </p>
          <br />
          <div>
            <RaisedButton
              disabled={submitting}
              type="submit"
              primary
              label="Submit!"
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.auth.token };
}

export default connect(mapStateToProps, { forgot })(
  reduxForm({
    form: "forgot",
    validate
  })(Forgot)
);
