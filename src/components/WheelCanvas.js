import React from "react";
import { inject, observer } from 'mobx-react';

class WheelCanvas extends React.Component{

  componentDidMount(){
    this.props.wheelStore.loadCanvas();
    this.props.wheelStore.wheelSaved = false;
  }

  render(){

    return (
      <div>
        <canvas id="Canvas1" width="550" height="550">Your browser does not support canvas.</canvas>
      </div>
    );
  }
}
WheelCanvas.propTypes = {
  wheelStore: React.PropTypes.object
};

export default inject('wheelStore')(observer(WheelCanvas));
