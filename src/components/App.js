import React from 'react';
import SignUp from './SignUp';
import Navigation from './Navigation';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

class App extends React.Component{
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.wheelStore.loadWheelsFromServer();
    console.log(this.props.wheelStore.wheels);
  }
  render() {
    return(
      <div>
        <Navigation/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  wheelStore: React.PropTypes.object
};

export default inject('wheelStore')(observer(App));
