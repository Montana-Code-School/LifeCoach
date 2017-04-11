import React from 'react';
import {extendObservable} from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
const dateFormat = require('dateformat');

export default class WheelStore {
  constructor(){
    extendObservable(this, {
      segs: [
        {value: 'Career  ', score: 0},
        {value: 'Financial  ', score: 0},
        {value: 'Spiritual  ', score: 0},
        {value: 'Health  ', score: 0},
        {value: 'Intellectual  ', score: 0},
        {value: 'Family  ', score: 0},
        {value: 'Social  ', score: 0},
        {value: 'Environmental  ', score: 0}
      ],
      display: [
        <i key={0} className="fa fa-briefcase" aria-hidden="true" style={{color:"#FF3251"}}></i>,
        <i key={1} className="fa fa-usd" aria-hidden="true" style={{color:"#FF7A32"}}></i>,
        <i key={2} className="fa fa-universal-access" aria-hidden="true" style={{color:"#3251FF"}}></i>,
        <i key={3} className="fa fa-heartbeat" aria-hidden="true" style={{color:"#32FF7A"}}></i>,
        <i key={4} className="fa fa-book" aria-hidden="true" style={{color:"#7A32FF"}}></i>,
        <i key={5} className="fa fa-users" aria-hidden="true" style={{color:"#E032FF"}}></i>,
        <i key={6} className="fa fa-handshake-o" aria-hidden="true" style={{color:"#FFE032"}}></i>,
        <i key={7} className="fa fa-globe" aria-hidden="true" style={{color:"#32B7FF"}}></i>

      ],
      wheels: [],
      wheelSaved: false,
      min: 1,
      step: 1,
      historyIndex: 0,
      newWheel: true
    });
    this.loadWheelsFromServer = this.loadWheelsFromServer.bind(this);
    this.addNewWheel = this.addNewWheel.bind(this);
    this.loadCanvas = this.loadCanvas.bind(this);
    this.loadHistoryCanvas = this.loadHistoryCanvas.bind(this);
    this.loadLastWheel = this.loadLastWheel.bind(this);
    this.resetWheel = this.resetWheel.bind(this);
  }

  addNewWheel(ownerId) {
    let segs = [];
    for(let i = 0; i < this.segs.length; i++){
      segs.push({
        value: this.segs[i].value,
        score: this.segs[i].score
      });
    }
    fetch('/wheel/wheels', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: new Date,
        segs: segs,
        owner: ownerId
      })
    })
    .then(result => result.json())
    .then(result => this.wheels.push(result));
    this.wheelSaved = true;
  }

  loadLastWheel(){
    if(this.wheels.length > 0){
      for(let i = 0; i < this.segs.length; i++) {
        this.segs[i].score = this.wheels[this.wheels.length - 1].segs[i].score;
      }
      this.newWheel = false;
    }
  }

  resetWheel(){
    for(let i = 0; i < this.segs.length; i++) {
      this.segs[i].score = 0;
    }
    this.newWheel = true;
    this.loadCanvas();
  }

  loadWheelsFromServer(ownerId) {
    fetch('/wheel/wheels/' + ownerId)
       .then(result => result.json())
       .then(wheels => this.wheels = wheels)
       .then(wheels => this.loadLastWheel());
  }

  loadCanvas(){
    let theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
      let ctx = theCanvas.getContext("2d");
      if (ctx) {
        let x = 275;
        let y = 275;
        let r = 260;
        let a = 360/this.segs.length;

        let rad = a * (Math.PI / 180);
        let colorArr = ["#FF3251", "#FF7A32", "#3251FF", "#32FF7A", "#7A32FF", "#E032FF", "#FFE032", "#32B7FF"];
        let backgroundColorArr = ["#FFB2BC", "#FFCEB2", "#B2E2FF", "#BCFFB2", "#CEB2FF", "#F4B2FF", "#FFF4B2", "#B2FFF4"];

        let symbolArr = [
          '\uf0b1',
          ' \uf155',
          '\uf29a',
          '\uf21e',
          '\uf02d',
          '\uf0c0',
          '\uf2b5',
          '\uf0ac'
        ];

        for(let i = 0; i < this.segs.length; i++){
          ctx.strokeStyle = 'grey';
          ctx.lineWidth = 3;
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x,y,r,(i * -rad), (i * -rad) - rad, true);
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x, y, this.segs[i].score * (r / 10), (i * -rad), (i * -rad) - rad, true);
          ctx.fillStyle = colorArr[i];
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.lineTo(x + (r * Math.cos(i * -rad)), y + (r * Math.sin(i * -rad)));
          ctx.stroke();
          ctx.fillStyle = "rgb(70,70,70)";
          ctx.font='40px FontAwesome';
          ctx.fillText(symbolArr[i], x - 20 + ((r * 0.75) * Math.cos((i * -rad) - (rad/2))), y + 15 + ((r * 0.75) * Math.sin((i * -rad) - (rad/2))));
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.lineTo(x + r, y);
          ctx.stroke();
        }
      }
    }
    return theCanvas;
  }

  loadHistoryCanvas(){
    let theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
      let ctx = theCanvas.getContext("2d");
      if (ctx) {
        let x = 250;
        let y = 250;
        let r = 240;
        let a = 360/this.segs.length;
        let rad = a * (Math.PI / 180);
        let colorArr = ["#FF3251", "#FF7A32", "#3251FF", "#32FF7A", "#7A32FF", "#E032FF", "#FFE032", "#32B7FF"];
        let backgroundColorArr = ["#FFB2BC", "#FFCEB2", "#B2E2FF", "#BCFFB2", "#CEB2FF", "#F4B2FF", "#FFF4B2", "#B2FFF4"];
        let symbolArr = [
          '\uf0b1',
          ' \uf155',
          '\uf29a',
          '\uf21e',
          '\uf02d',
          '\uf0c0',
          '\uf2b5',
          '\uf0ac'
        ];

        for(let i = 0; i < this.segs.length; i++){
          ctx.strokeStyle = 'grey';
          ctx.lineWidth = 3;
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x,y,r,(i * -rad), (i * -rad) - rad, true);
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x, y, this.wheels[this.historyIndex].segs[i].score * (r / 10), (i * -rad), (i * -rad) - rad, true);
          ctx.fillStyle = backgroundColorArr[i];
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.lineTo(x + (r * Math.cos(i * -rad)), y + (r * Math.sin(i * -rad)));
          ctx.stroke();
          ctx.strokeStyle = colorArr[i];
          ctx.lineWidth = 7;
          ctx.beginPath();
          ctx.moveTo(x + (this.wheels[this.wheels.length - 1].segs[i].score * (r / 10) * Math.cos(i * -rad)), y + (this.wheels[this.wheels.length - 1].segs[i].score * (r/10) * Math.sin(i * -rad)));
          ctx.arc(x, y, this.wheels[this.wheels.length - 1].segs[i].score * (r / 10), (i * -rad), (i * -rad) - rad, true);
          ctx.stroke();
          ctx.strokeStyle = 'grey';
          ctx.lineWidth = 3;
          ctx.fillStyle = "rgb(70,70,70)";
          ctx.font='50px FontAwesome';
          ctx.fillText(symbolArr[i], x - 28 + ((r * 0.75) * Math.cos((i * -rad) - (rad/2))), y + 15 + ((r * 0.75) * Math.sin((i * -rad) - (rad/2))));
        }
      }
    }
    return theCanvas;
  }
}
