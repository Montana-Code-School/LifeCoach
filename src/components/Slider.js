import React from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import {Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';


class Slider extends React.Component{
  constructor(){
    super();
    this.changeScore=this.changeScore.bind(this);
  }

  changeScore(i, e){
    this.props.wheelStore.segs[i].score = e.target.value;
    this.props.wheelStore.loadCanvas();
    console.log(this.props.wheelStore.segs[i].score, i);
  }

  render(){
    let sliderArr = [];
    for(let i = 0; i < this.props.segs.length; i++){
      sliderArr.push(
        <Row>
          <Col md={6}>
            <div>
              <h2>{this.props.segs[i].value}</h2>
              <ReactBootstrapSlider
                value={this.props.wheelStore.segs[i].score}
                change={this.changeScore.bind(null, i)}
                step= {1}
                max={10}
                min={0}
                ticks = {[0,1,2,3,4,5,6,7,8,9,10]}
                orientation="horizontal"/>
            </div>
          </Col>
        </Row>
      );
    }

    return(
      <div className="bodyText">{sliderArr}</div>
    );
  }
}

Slider.propTypes = {
  changeScore: React.PropTypes.func,
  segs: React.PropTypes.array,
  wheelStore: React.PropTypes.object
};


export default inject('wheelStore')(observer(Slider));
