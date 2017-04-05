import {extendObservable} from 'mobx';
import {hashHistory} from 'react-router';
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
      backlogArr: [],
      priorityArr: [],
      optionIndex:'',
      columnLabels: ["backlog", "priority", "today", "complete", "trash"]
    });
    this.changeStatus = this.changeStatus.bind(this);
    this.makePriority = this.makePriority.bind(this);
    this.makeToday = this.makeToday.bind(this);
    this.makeBacklog = this.makeBacklog.bind(this);
    this.makeComplete = this.makeComplete.bind(this);
    this.makeTrash = this.makeTrash.bind(this);

  }

  loadGoalsFromServer(ownerId) {

    fetch('/goal/goals/' + ownerId)
       .then(result => result.json())
       .then(goals => this.goalsArr = goals)
       .then(goals => console.log(this.goalsArr))
       .then(goals => this.backlogArr.push(this.goalsArr.forEach(function(goal){
         if(goal.status == "backlog"){
           return goal;
         }})))
        .then(goals => console.log(this.backlogArr));
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
    goal.status = "backlog";
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

}
