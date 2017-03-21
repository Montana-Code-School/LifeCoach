import {extendObservable} from 'mobx';
import {browserHistory} from 'react-router';
import React from 'react';

// Please put some space between your class methods below
// (constructor, authUser, setUser, ...) - HAROLD

export default class UserStore {
  constructor(){
    extendObservable(this, {
      firstName: "",
      email: "",
      password: "",
      token: "",
      admin: false,
      isLoggedIn: false,
      failedLogin: false,
      userId: ""
    });
    this.authUser = this.authUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
  }
  authUser(user) {
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    .then(result => result.json())
    .then(res => {
      this.token = res.token;
      this.userId = res.userId;
      this.firstName = res.firstName;
      if(res.token){
        this.isLoggedIn = true;
        browserHistory.replace("/");
      } else {
        this.failedLogin = true;
      }
    });
  }
  setUser(user) {
    this.email = user.email;
    this.password = user.password;
  }
  logUserOut() {
      this.token = "";
      this.isLoggedIn = false;
      this.admin = false;
      this.firstName= "";
      this.email= "";
      this.password= "";
      this.failedLogin= false;
      this.userId= "";
      console.log(this.isLoggedIn);
    }
}
