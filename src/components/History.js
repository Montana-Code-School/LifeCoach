import React from 'react';
import { inject, observer } from 'mobx-react';
import { Table, Jumbotron } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
const dateFormat = require('dateformat');

class History extends React.Component{
  constructor() {
    super();
    this.changeHistoryIndex = this.changeHistoryIndex.bind(this);
    this.setTicksArr = this.setTicksArr.bind(this);
  }

  componentDidMount(){
    this.props.wheelStore.loadHistoryCanvas();
  }

  changeHistoryIndex(e){
    this.props.wheelStore.historyIndex = e.target.value - 1;
    this.props.wheelStore.loadHistoryCanvas();
  }



  setTicksArr(){
    let ticksArr = [];
    for (let i=1; i <= this.props.wheelStore.wheels.length; i++) {
      ticksArr.push(i);
    }
    return ticksArr;
  }

  render(){

    if(this.props.wheelStore.wheels.length > 0){
      let wheelArray = this.props.wheelStore.wheels;
      let index = this.props.wheelStore.historyIndex;
      let ticksArr = this.setTicksArr();

      return (
      <div className="background-container2">
        <div className="container">

            <h2 className="subheader2">Your History</h2>

            <div className="canvasCenter">
            <h3 className="subheader">
                {dateFormat(wheelArray[index].date,
                   "dddd, mmmm dS, yyyy, h:MM TT")}
            </h3>
              <canvas id="Canvas1" width="550" height="550">Your browser does not support canvas.</canvas>
            </div>
          <div className="history-slider">
            <h2 className="bodyText">Your History</h2>
            <ReactBootstrapSlider className= "slider"
              value={index + 1}
              change={this.changeHistoryIndex}
              step={this.props.wheelStore.step}
              max={wheelArray.length}
              min={this.props.wheelStore.min}
              ticks = {ticksArr}
              orientation="horizontal"/>
          </div>
        </div>
      </div>
    );
    }
    else {
      return (
        <div className="background-container2">
          <div className="container">
              <h1 className="jumbotronHeader2">Your History</h1>
            <div className="subheader3">You have not filled out any wheels yet! </div>
          </div>
        </div>
      );
    }
  }
}

History.propTypes = {
  wheelStore: React.PropTypes.object
};

export default inject('wheelStore')(observer(History));
