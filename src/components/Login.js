import React from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory, Link } from 'react-router';
import { Jumbotron, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserAuth = this.handleUserAuth.bind(this);
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleUserAuth(event){
    event.preventDefault();
    let user = {email: this.state.email, password: this.state.password};
    this.props.userStore.authUser(user);
    this.props.userStore.setUser(user);
    this.setState({email: "", password: ""});
  }
  render(){
    let loginForm = (
      <div>
      <div className="login-form">
          <form method="" role="form">
            <h1 className="jumbotronHeader">Please Log In</h1>
            <div className="form-group">
              <input onChange={this.handleEmailChange} value={this.state.email} type="text" className="form-control" id="email" placeholder="email"/>
            </div>
            <div className="form-group">
              <input onChange={this.handlePasswordChange} value={this.state.password}type="password" className="form-control" id="password" placeholder="password"/>
            </div>
            <Button onClick={this.handleUserAuth} onTouchTap={this.handleUserAuth} type="submit" className="submitForm"><strong>Log In</strong></Button>
          </form>
      </div>
    </div>);
    if(this.props.userStore.failedLogin){
      return(
        <div>
          {loginForm}
          <h3 className="invalidUser">Please enter valid username and password.</h3>
        </div>
      );
    } else {
      return (
        <div>
          {loginForm}
        </div>
      );
    }
  }
}
Login.propTypes = {
  userStore: React.PropTypes.object
};
export default inject('userStore')(observer(Login));
