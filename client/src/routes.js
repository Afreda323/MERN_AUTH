import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";
import Header from "./components/Header";
import Login from "./pages/login";
import Signup from "./pages/signup";

import { MuiThemeProvider } from "material-ui/styles";
import ProtectedRoute from "./components/ProtectedRoute";
import Protected from "./pages/protected";
import { connect } from "react-redux";

// import Forgot from "./pages/forgot";

class Routes extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Header token={this.props.auth.token} />
            <Route exact path="/" component={Login} />
            <Route path="/verified" component={Login} />
            {/*<Route path="/forgot" component={Forgot} />*/}
            <Route
              path="/signup"
              component={Signup}
              token={this.props.auth.token}
            />
            <ProtectedRoute
              path="/secret"
              component={Protected}
              token={this.props.auth.token}
            />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(Routes);
