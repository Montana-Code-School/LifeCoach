import React from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default class EntryPage extends React.Component {
  render() {
    return(

      <div className="background-container">
        <h1 className="lifecoach"> Life Coach </h1>
        <div className="left-container">
          <Login/>
        </div>
        <div className="right-container">
          <SignUp/>
        </div>
      </div>
    );
  }
}
