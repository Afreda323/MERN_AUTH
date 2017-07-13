import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../../actions";

class Protect extends Component {
  componentDidMount() {
    const { token, getData } = this.props;
    getData(token);
  }
  render() {
    return (
      <div>
        <h1>The Secret Page</h1>
        <p>
          {this.props.data !== '' ? this.props.data : "loading..."}
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    data: state.data
  };
}
export default connect(mapStateToProps, { getData })(Protect);
