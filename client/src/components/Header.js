import React, { Component } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

class Header extends Component {
  render() {
    return (
      <div>
        {this.props.token
          ? <ul>
              <li>
                <Link to="/secret">Secret</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          : <ul>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>}
      </div>
    );
  }
}

export default Header;
