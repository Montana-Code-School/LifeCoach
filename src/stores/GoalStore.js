import {extendObservable} from 'mobx';
import {browserHistory} from 'react-router';
import React from 'react';

export default class GoalStore {
  constructor(){
    extendObservable(this, {
      lifeGoal: "",
      valuesArr: [
        "Career", "Financial", "Spiritual", "Health", "Intellectual", "Family",
        "Social", "Environmental"
      ],
      goalsArr: [],
      optionIndex:'',
      columnLabels: ["goals", "priority", "today", "complete", "trash"],
      backgroundColorArr: ["#FF3251", "#FF7A32", "#3251FF", "#66D453", "#7A32FF", "#E032FF", "#E7CB2B", "#32B7FF"],
      quoteArr: [
        "Nothing can stop you!",
        "Every accomplishment begins with the decision to try!",
        "You got this!",
        "Stay positive, work hard, make it happen!",
        "Motivation gets you going and habit gets you there!",
        "If it doesn't challenge you, it won't change you!",
        "A goal without a plan is just a wish!",
        "Today is the beginning of whatever you want!"
      ],
      quote: ""

    });
    this.changeStatus = this.changeStatus.bind(this);
    this.makePriority = this.makePriority.bind(this);
    this.makeToday = this.makeToday.bind(this);
    this.makeBacklog = this.makeBacklog.bind(this);
    this.makeComplete = this.makeComplete.bind(this);
    this.makeTrash = this.makeTrash.bind(this);
    this.cardColor = this.cardColor.bind(this);
  }

  loadGoalsFromServer(ownerId) {
    fetch('/goal/goals/' + ownerId)
       .then(result => result.json())
       .then(goals => this.goalsArr = goals);
  }

  changeStatus(goalId, index){
    fetch('/goal/goals/' + goalId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: this.columnLabels[index]
      })
    });
  }

  makeBacklog(goal, e){
    this.changeStatus(goal._id, 0);
    this.goalsArr = this.goalsArr.filter(g => g._id !== goal._id);
    goal.status = "goals";
    this.goalsArr.push(goal);
  }

  makePriority(goal, e){
    this.changeStatus(goal._id, 1);
    this.goalsArr = this.goalsArr.filter(g => g._id !== goal._id);
    goal.status = "priority";
    this.goalsArr.push(goal);
  }

  makeToday(goal, e){
    this.changeStatus(goal._id, 2);
    this.goalsArr = this.goalsArr.filter(g => g._id !== goal._id);
    goal.status = "today";
    this.goalsArr.push(goal);
  }

  makeComplete(goal, e){
    this.changeStatus(goal._id, 3);
    this.goalsArr = this.goalsArr.filter(g => g._id !== goal._id);
    goal.status = "complete";
    this.goalsArr.push(goal);
  }

  makeTrash(goal, e){
    this.changeStatus(goal._id, 4);
    this.goalsArr = this.goalsArr.filter(g => g._id !== goal._id);
    goal.status = "trash";
    this.goalsArr.push(goal);
  }

  cardColor(goal){
    for(let i = 0; i < this.valuesArr.length; i++){
      if(goal.value == this.valuesArr[i]){
        return this.backgroundColorArr[i];
      }
    }
  }
}
