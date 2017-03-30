import React from 'react';
import {extendObservable} from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';
const dateFormat = require('dateformat');




export default class WheelStore {
  constructor(){
    extendObservable(this, {
      // date: "",
      segs: [
        {value: 'Career', score: 0},
        {value: 'Financial', score: 0},
        {value: 'Spiritual', score: 0},
        {value: 'Health', score: 0},
        {value: 'Intellectual', score: 0},
        {value: 'Family', score: 0},
        {value: 'Social', score: 0},
        {value: 'Environmental', score: 0}
      ],
      wheels: [],
      // wheelDates: [],
      min: 1,
      step: 1,
      historyIndex: 0
    });
    // this.handleDelete = this.handleDelete.bind(this);
    this.loadWheelsFromServer = this.loadWheelsFromServer.bind(this);
    // this.setDate = this.setDate.bind(this);
    this.addNewWheel = this.addNewWheel.bind(this);
    this.loadCanvas = this.loadCanvas.bind(this);
    this.loadHistoryCanvas = this.loadHistoryCanvas.bind(this);
  }
  // setDate(){
  //   let date = new Date;
  //   this.date = date;
  //   return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM TT");
  // }
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
  }


  loadWheelsFromServer(ownerId) {
    fetch('/wheel/wheels/' + ownerId)
       .then(result => result.json())
       .then(wheels => this.wheels = wheels)
       .then(wheels => wheels.forEach(wheel => this.wheelDates.push(dateFormat(wheel.date,
         "mm/dd/yy"))))
       .then(wheels => console.log(this.wheelDates));
  }

  loadCanvas(){
    let theCanvas = document.getElementById('Canvas1');
    if (theCanvas && theCanvas.getContext) {
      let ctx = theCanvas.getContext("2d");
      if (ctx) {
        let x = 350;
        let y = 350;
        let r = 325;
        let a = 360/this.segs.length;

        let rad = a * (Math.PI / 180);
        let colorArr = ["#ff7733", "#cc6699", "#9933ff", "#3377ff", "#66cc99", "#bbbb77", "#ffff33", "#cc9966"];
        let backgroundColorArr = ["#ffddcc", "#f2d9e6", "#e6ccff", "#ccddff", "#d9f2e6", "#eeeedd", "#ffffcc", "#f2e6d9"];

        let symbolArr = [
          '\uf0b1',
          ' \uf155',
          '\uf2dd',
          '\uf21e',
          '\uf02d',
          '\uf0c0',
          '\uf2b5',
          '\uf0ac'
        ];

        for(let i = 0; i < this.segs.length; i++){
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x,y,r,(i * -rad), (i * -rad) - rad, true);
          ctx.fillStyle = backgroundColorArr[i];
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x, y, this.segs[i].score * (r / 10), (i * -rad), (i * -rad) - rad, true);
          ctx.fillStyle = colorArr[i];
          ctx.fill();
          ctx.fillStyle = "maroon";
          ctx.font='50px FontAwesome';
          ctx.fillText(symbolArr[i], x - 28 + ((r * 0.75) * Math.cos((i * -rad) - (rad/2))), y + 15 + ((r * 0.75) * Math.sin((i * -rad) - (rad/2))));
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
        let x = 275;
        let y = 275;
        let r = 250;
        let a = 360/this.wheels[this.historyIndex].segs.length;
        let rad = a * (Math.PI / 180);
        let colorArr = ["#ff7733", "#cc6699", "#9933ff", "#3377ff", "#66cc99", "#bbbb77", "#ffff33", "#cc9966"];
        let backgroundColorArr = ["#ffddcc", "#f2d9e6", "#e6ccff", "#ccddff", "#d9f2e6", "#eeeedd", "#ffffcc", "#f2e6d9"];
        let symbolArr = [
          '\uf0b1',
          ' \uf155',
          '\uf2dd',
          '\uf21e',
          '\uf02d',
          '\uf0c0',
          '\uf2b5',
          '\uf0ac'
        ];

        for(let i = 0; i < this.wheels[this.historyIndex].segs.length; i++){
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x,y,r,(i * -rad), (i * -rad) - rad, true);
          ctx.fillStyle = backgroundColorArr[i];
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.arc(x, y, this.wheels[this.historyIndex].segs[i].score * (r / 10), (i * -rad), (i * -rad) - rad, true);
          ctx.fillStyle = colorArr[i];
          ctx.fill();
          ctx.fillStyle = "maroon";
          ctx.font='50px FontAwesome';
          ctx.fillText(symbolArr[i], x - 28 + ((r * 0.75) * Math.cos((i * -rad) - (rad/2))), y + 15 + ((r * 0.75) * Math.sin((i * -rad) - (rad/2))));
        }
      }
    }
    return theCanvas;
  }
}


// In general it's not good practice to check in commented out code. -- HAROLD



//   handleDelete(imgId) {
//     let newList = this.images.filter(img => img._id !== imgId);
//     let allnewList = this.allImages.filter(img => img._id !== imgId);
//     this.images = newList;
//     this.allImages = allnewList;
//     fetch('/gifs/' + imgId, {
//       method: 'DELETE'
//     });
//   }
