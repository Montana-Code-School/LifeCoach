import React from 'react';
import { Jumbotron, FormGroup, FormControl, ControlLabel, Button, MenuItem } from 'react-bootstrap';
import DisplayLifeGoals from './DisplayLifeGoals';
import { inject, observer } from 'mobx-react';


class LifeGoals extends React.Component{
  constructor(){
    super();
    this.state = {
      lifeGoal: "",
      valuesArr: [
        "Career", "Financial", "Spiritual", "Health", "Intellectual", "Family",
        "Social", "Environmental"
      ],
      goalsArr: [],
      optionIndex:'',
      failedSelect: false,
      failedWriteGoal: false
    };
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.addNewGoal = this.addNewGoal.bind(this);
    this.prepareOptions = this.prepareOptions.bind(this);
    this.handleGoalAdd = this.handleGoalAdd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount(){
    this.loadGoalsFromServer(this.props.userStore.userId);
  }

  handleGoalChange(e) {
    this.setState({lifeGoal: e.target.value, failedWriteGoal: false});
    console.log(this.state.lifeGoal);
  }

  handleSelect(e){
    console.log(e.target.value);
    if(e.target.value == "select"){
      this.setState({optionIndex: '', failedSelect: true});
    } else {
      this.setState({failedSelect: false, optionIndex: e.target.value});
    }
  }

  addNewGoal() {
    let index = this.state.optionIndex;
    fetch('/goal/goals', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: this.state.valuesArr[index],
        lifeGoal: this.state.lifeGoal,
        owner: this.props.userStore.userId
      })
    })
    .then(result => result.json())
    .then(result => this.state.goalsArr.push(result))
    .then(result => this.setState({lifeGoal: ''}));
  }

  handleGoalAdd(e){
    if(this.state.lifeGoal === ''){
      this.setState({failedWriteGoal: true});
      return;
    }
    if(this.state.optionIndex === '' || this.state.optionIndex === 'select'){
      this.setState({failedSelect: true});
      return;
    }
    else {
      this.addNewGoal();
    }
  }

  loadGoalsFromServer(ownerId) {
    fetch('/goal/goals/' + ownerId)
       .then(result => result.json())
       .then(goals => this.setState({goalsArr: goals}))
       .then(goals => console.log(this.state.goalsArr));
  }

  prepareOptions(){
    let optionArr = [];
    this.state.valuesArr.forEach((value, index) =>
        optionArr.push(<option key={index} value={index}>{value}</option>)
    );
    return optionArr;
  }

  render(){
    let selectValue = <div><h4>Please select a Life Category</h4></div>;
    let writeGoal = <div><h4>Please write a Goal</h4></div>;
    let optionArr = this.prepareOptions();
    let goalForm = (
      <form>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Life Category</ControlLabel>
            <FormControl onChange={this.handleSelect} componentClass="select" placeholder="select">
              <option value="select">select</option>
              {optionArr}
            </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Write your life goal</ControlLabel>
            <FormControl onChange={this.handleGoalChange} componentClass="textarea" value={this.state.lifeGoal} placeholder="My goal is.." />
        </FormGroup>
        <div onClick={this.handleGoalAdd} className="submitForm" type="submit">Submit</div>
      </form>
    );

    return (
      <div className="background-container2">
        <div className="container">
          <h1  className="jumbotronHeader2">Life Goals</h1>
          <h3 className="subheader">What life goals would you like to set for yourself?</h3>
         {goalForm}
         {this.state.failedSelect ? selectValue : ""}
         {this.state.failedWriteGoal ? writeGoal: ""}
        <div>
            <DisplayLifeGoals goalsArr={this.state.goalsArr} valuesArr={this.state.valuesArr} />
          </div>
        </div>
      </div>
    );
  }
}

LifeGoals.propTypes = {
  userStore: React.PropTypes.object
};

export default inject ('userStore') (observer (LifeGoals));
