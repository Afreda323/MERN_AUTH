import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";
import Header from "./components/Header";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { MuiThemeProvider } from "material-ui/styles";
import ProtectedRoute from "./components/ProtectedRoute";
import Protected from "./pages/protected";
import { connect } from "react-redux";
class Routes extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <ProtectedRoute
              path="/secret"
              component={Protected}
              isLoggedIn={this.props.auth.isLoggedIn}
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
