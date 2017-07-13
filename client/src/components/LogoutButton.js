import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions";
import FlatButton from "material-ui/FlatButton";

class LogoutButton extends Component {
  render() {
    return <FlatButton primary onClick={this.props.logout} label="Logout"/>;
  }
}

export default connect(null, { logout })(LogoutButton);
