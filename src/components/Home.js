import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import { LinkContainer } from 'react-router-bootstrap';

class Home extends React.Component{
  render(){ // Would be easier to read with shorter lines below - Harold
    return (

      <div className="background-container2">
        <div className="container">
            <div className="bodyText">
              <div className="home-text">
                <h2> Are you ready to realize your full potential?</h2>
                <h1>Welcome to <span  className="branded">Life Coach™</span></h1>
                <br></br>
                <h3> The <LinkContainer className="home-link" to={{pathname: '/wheel'}}><strong>Wheel of Life</strong></LinkContainer> helps you rate your current standing.</h3>
                <h3> Then, dream of the future by making a list of <LinkContainer className="home-link" to={{pathname: '/lifegoals'}}><strong> life goals</strong></LinkContainer>.</h3>
                <h3><LinkContainer className="home-link" to={{pathname: '/history'}}><strong>Track your progress</strong></LinkContainer> over time. </h3>
              </div>
            </div>
        </div>
      </div>
    );
  }
}
Home.propTypes={
  userStore: React.PropTypes.object
};

export default inject('userStore')(observer(Home));
