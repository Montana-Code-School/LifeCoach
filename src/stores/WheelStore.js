import React from 'react';
import {extendObservable} from 'mobx';
import { Button, Glyphicon } from 'react-bootstrap';



export default class WheelStore {
  constructor(){
    extendObservable(this, {
      date: "",
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      score5: 0,
      score6: 0,
      score7: 0,
      score8: 0,
      value1: 'Career',
      value2: 'Financial',
      value3: 'Spiritual',
      value4: 'Health',
      value5: 'Intellectual',
      value6: 'Family',
      value7: 'Social',
      value8: 'Environmental',
      wheels: []
    });
    // this.handleDelete = this.handleDelete.bind(this);
    this.loadWheelsFromServer = this.loadWheelsFromServer.bind(this);
    this.setDate = this.setDate.bind(this);
    this.addNewWheel = this.addNewWheel.bind(this);
  }
  setDate(){
    let date = new Date().toLocaleDateString();
    this.date = date;
    return date;
  }
  addNewWheel(wheel) {
    fetch('/wheel/wheels', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: this.date,
        value1 : this.value1,
        score1: this.score1,
        value2: this.value2,
        score2: this.score2,
        value3 : this.value3,
        score3: this.score3,
        value4 : this.value4,
        score4: this.score4,
        value5 : this.value5,
        score5: this.score5,
        value6 : this.value6,
        score6: this.score6,
        value7 : this.value7,
        score7: this.score7,
        value8 : this.value8,
        score8: this.score8
      })
    })
    .then(result => result.json());
  }

  loadWheelsFromServer() {
    fetch('/wheel/wheels')
       .then(result => result.json())
       .then(wheels => this.wheels = wheels);
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
