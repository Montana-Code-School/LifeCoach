import React from 'react';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { Row } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';


class Slider extends React.Component{
  constructor(){
    super();
    this.changeScore=this.changeScore.bind(this);
  }

  changeScore(i, e){
    this.props.wheelStore.segs[i].score = e.target.value;
    this.props.wheelStore.loadCanvas();
  }

  render(){
    let sliderArr = [];
    for(let i = 0; i < this.props.segs.length; i++){
      sliderArr.push(
        <Row key={i}>
          <div style={{padding:"15px", borderRadius: "15px", background: "#ededed", border:'1px solid black', width:'100%'}}>
            <h4 style={{width:'220px', marginTop:'0', color:'rgb(70,70,70)'}}>{this.props.segs[i].value}{this.props.display[i]}</h4>
            <ReactBootstrapSlider
              value={this.props.wheelStore.segs[i].score}
              change={this.changeScore.bind(null, i)}
              step= {1}
              max={10}
              min={0}
              orientation="horizontal"/>
          </div>
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
