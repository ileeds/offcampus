import React, {Component} from 'react';
import {submitLogin} from '../../actions/authActions';
import {connect} from 'react-redux';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      loginInformation: {}
    };
  }

  updateLoginInformation(event) {
    let updateLoginInformation = Object.assign({}, this.state.loginInformation);

    updateLoginInformation[event.target.id] = event.target.value;
    this.setState({loginInformation: updateLoginInformation});
  }

  login() {
    this.props.dispatch(submitLogin(this.state.loginInformation));
  }

  render() {
    return (<div>
      <h3>Login</h3>
      Username
      <input onChange={this.updateLoginInformation.bind(this)} id="username" type="text" placeholder="Username"/><br/>
      Password
      <input onChange={this.updateLoginInformation.bind(this)} id="password" type="password" placeholder="Password"/><br/>
      <button onClick={this.login.bind(this)}>Go</button>
    </div>)
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(Login);
