import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Login from "../presentation/Login";
import Register from "../presentation/Register";
import { logoutUser } from "../../actions/authActions";
import { registrationLanding } from "../../actions/landingActions";

class AuthenticationContainer extends Component {
  constructor() {
    super();

    this.state = {
      toggleRegister: true
    };
  }

  componentDidMount() {
    this.props.registrationLanding();
  }

  componentDidUpdate() {
    if (this.props.landed && this.state.toggleRegister) {
      this.setState({ toggleRegister: false });
    }
  }

  showLogin() {
    this.setState({ toggleRegister: false });
  }

  showRegister() {
    this.setState({ toggleRegister: true });
  }

  logout() {
    this.props.logoutUser();
  }

  render() {
    const userNotLoggedIn = (
      <div>
        {this.props.loading ? (
          <LinearProgress />
        ) : this.state.toggleRegister ? (
          <Register handleClick={() => this.showLogin()} />
        ) : (
          <Login handleClick={() => this.showRegister()} />
        )}
      </div>
    );
    const userLoggedIn = (
      <div>
        Logged in as: {this.props.email}
        <button onClick={() => this.logout()}>Logout</button>
      </div>
    );

    return <div>{this.props.loggedIn ? userLoggedIn : userNotLoggedIn}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    email: state.auth.email,
    loading: state.landing.loading,
    landed: state.landing.registration
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, registrationLanding }
)(AuthenticationContainer);
