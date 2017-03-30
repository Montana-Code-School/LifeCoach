import React from "react";
import { inject, observer } from 'mobx-react';

class WheelCanvas extends React.Component{
  constructor(){
    super();
    // this.loadCanvas = this.loadCanvas.bind(this);
  }
  componentDidMount(){
    this.props.wheelStore.loadCanvas();
  }

  render(){
    return (
      <div className="canvasFloat">
        <canvas id="Canvas1" width="700" height="700">Your browser does not support canvas.</canvas>
      </div>
    );
  }
}
WheelCanvas.propTypes = {
  wheelStore: React.PropTypes.object
};

export default inject('wheelStore')(observer(WheelCanvas));
