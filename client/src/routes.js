import { BrowserRouter, Route } from "react-router-dom";
import React, { Component } from "react";
import Header from "./components/Header";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { MuiThemeProvider } from "material-ui/styles";

class Routes extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default Routes;
