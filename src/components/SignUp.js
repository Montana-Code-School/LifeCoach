import React from 'react';
import { Jumbotron } from 'react-bootstrap';


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  addUserToDatabase(e){
    e.preventDefault();
    fetch('/newuser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
    });
    this.setState({firstName: "", lastName: "", email: "", password: ""});
  }


  render() {
    // break up long lines below... - Harold
    let signUpForm = (
      <div className="login-form">

        <form method="" role="form">
            <h1 className="jumbotronHeader">Please Sign Up</h1>
            <div className="form-group">
              <input onChange={this.handleFirstNameChange} value={this.state.firstName} type="text" className="form-control" id="first-name" placeholder="first name"/>
            </div>
            <div className="form-group">
              <input onChange={this.handleLastNameChange} value={this.state.lastName} type="text" className="form-control" id="last-name" placeholder="last name"/>
            </div>
            <div className="form-group">
              <input onChange={this.handleEmailChange} value={this.state.email} type="text" className="form-control" id="email" placeholder="email"/>
            </div>
            <div className="form-group">
              <input onChange={this.handlePasswordChange} value={this.state.password}type="password" className="form-control" id="password" placeholder="password"/>
            </div>
            <div onClick={this.addUserToDatabase} type="submit" className="submitForm"><strong>Sign Up</strong></div>
         </form>

       </div>
    );
    return (
      <div>
        {signUpForm}
      </div>

    );
  }
}
