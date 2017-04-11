import React from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { observer, inject } from 'mobx-react';
import Slider from './Slider';
import WheelCanvas from './WheelCanvas';
import dateFormat from 'dateformat';

class Wheel extends React.Component{
  constructor(){
    super();

    this.handleAddWheel = this.handleAddWheel.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleAddWheel(){
    let ownerId = this.props.userStore.userId;
    this.props.wheelStore.addNewWheel(ownerId);
    this.props.wheelStore.newWheel = false;
  }

  handleDate(){
    if(this.props.wheelStore.wheels.length > 0) {
      let dateLine = (
      <h4 className="subheader"> Your last wheel: &nbsp;
        {dateFormat(this.props.wheelStore.wheels[this.props.wheelStore.wheels.length - 1].date,
           "dddd, mmmm dS, yyyy")}
      </h4>
    );
      return dateLine;
    }  else {
      let dateLine = <br/>;
      return dateLine;
    }
  }

  render(){
    let wheelSaved = (
      <div className="wheel-saved">
        <h3 className="wheel-saved-text">Your wheel is saved!!</h3>
      </div>
    );
    let save = (
            <button
              className="wheel-button"
              onClick={this.handleAddWheel}
              bsStyle="primary"
              block>
              <h4 className="wheel-button-text">Save</h4>
            </button>
          );

    let newWheel = <br/>;

    return (
      <div className="parent">
        <div className="container">
            <div>
              <h2 className="jumbotronHeader2"><strong>Wheel of Life</strong></h2>
              <h3 className="subheader">Assess how you are doing in these 8 life categories.</h3>
            </div>
            <div className="wheel-page">

              <div style={{marginTop: '25px'}}>
                <Slider segs={this.props.wheelStore.segs} display={this.props.wheelStore.display}/>
                <br/>
              </div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'center', border:'1px solid black', borderRadius:'15px', background:'#ededed', padding:'15px'}}>
              <div>
              {this.props.wheelStore.newWheel ? newWheel: this.handleDate()}
              </div>
              <WheelCanvas/>
              <div style={{display: 'flex', justifyContent: "space-around", width: '100%'}}>
                {this.props.wheelStore.wheelSaved ? wheelSaved : save}
                <button onClick={this.props.wheelStore.resetWheel} className="wheel-new new-wheel-text"><h4>New Wheel</h4></button>
              </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

Wheel.propTypes = {
  wheelStore: React.PropTypes.object,
  userStore: React.PropTypes.object
};

export default inject('wheelStore', 'userStore')(observer(Wheel));
