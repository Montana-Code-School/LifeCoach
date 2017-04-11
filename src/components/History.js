import React from 'react';
import { inject, observer } from 'mobx-react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import dateFormat from 'dateformat';

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
    this.props.wheelStore.loadHistoryCanvas();
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
        <div className="container">
          <h2 className="jumbotronHeader2">History</h2>
          <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', marginTop:'2vh'}}>
            <div style={{border:'1px solid black', borderRadius:'15px', background:'#ededed', padding:'15px'}}>
              <div className="canvasCenter">
                <h3 className="subheader">
                    {dateFormat(wheelArray[index].date,
                       "dddd, mmmm dS, yyyy")}
                </h3>
                <canvas id="Canvas1" width="500" height="500">Your browser does not support canvas.</canvas>
              </div>
                <div className="history-slider">
                  <h2 className="bodyText">Your History</h2>
                  <ReactBootstrapSlider
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
          </div>
      );
    }
    else {
      return (
        <div className="parentHist">
          <div className="container">
              <h1 className="jumbotronHeader2">History</h1>
            <div className="subheader3">Head over to the Wheel Of Life page to begin your self-assessment! </div>
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
