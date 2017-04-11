import React from 'react';
import { Jumbotron, FormGroup, FormControl, ControlLabel, Button, MenuItem, Row, Col } from 'react-bootstrap';
import DisplayLifeGoals from './DisplayLifeGoals';
import { inject, observer } from 'mobx-react';
import BacklogColumn from './BacklogColumn';
import PriorityColumn from './PriorityColumn';
import TodayColumn from './TodayColumn';
import CompleteColumn from './CompleteColumn';

class LifeGoals extends React.Component{
  constructor(){
    super();
    this.state = {
      lifeGoal: "",
      valuesArr: [
        "Career", "Financial", "Spiritual", "Health", "Intellectual", "Family",
        "Social", "Environmental"
      ],
      status:"",
      optionIndex:'',
      failedSelect: false,
      failedWriteGoal: false,
    };
    this.handleGoalChange = this.handleGoalChange.bind(this);
    this.addNewGoal = this.addNewGoal.bind(this);
    this.prepareOptions = this.prepareOptions.bind(this);
    this.handleGoalAdd = this.handleGoalAdd.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.prepareColumns = this.prepareColumns.bind(this);
    this.prepareLabels = this.prepareLabels.bind(this);
    this.filterGoals = this.filterGoals.bind(this);
  }

  // componentDidMount(){
  //   this.props.goalStore.loadGoalsFromServer(this.props.userStore.userId);
  // }

  filterGoals(goals){
    let backlogArr = goals.filter(goal => goal.status == "backlog");
  }

  handleGoalChange(e) {
    this.setState({lifeGoal: e.target.value, failedWriteGoal: false});
  }

  handleSelect(e){
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
        status: "backlog",
        owner: this.props.userStore.userId
      })
    })
    .then(result => result.json())
    .then(result => this.props.goalStore.goalsArr.push(result))
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

  prepareOptions(){
    let optionArr = [];
    this.props.goalStore.valuesArr.forEach((value, index) =>
        optionArr.push(<option key={index} value={index}>{value}</option>)
    );
    return optionArr;
  }

  prepareLabels(){
    let labelArr = [];
    this.props.goalStore.columnLabels.forEach((label, index) =>
      labelArr.push(
        <Col md={3} style={{textAlign: 'center'}}>
          <h3 className="column-labels">{this.props.goalStore.columnLabels[index].toUpperCase()}</h3>
        </Col>
      ));
    labelArr.pop();
    return labelArr;
  }

  prepareColumns(){
    let columnArr = [];
    this.props.goalStore.columnLabels.forEach((label, index) =>
      columnArr.push(
          <Column key={index}>
            Goals
          </Column>
      ));
    return columnArr;
  }

  render(){
    let selectValue = <div><h4>Please select a Life Category</h4></div>;
    let writeGoal = <div><h4>Please write a Goal</h4></div>;
    let optionArr = this.prepareOptions();
    // let columnArr = this.prepareColumns();
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
      <div className="parent">
        <div className="container">
          <h1  className="jumbotronHeader2">Goals</h1>
          <h3 className="subheader">{this.props.goalStore.quoteArr[Math.floor(Math.random() * this.props.goalStore.quoteArr.length)]}</h3>
         {goalForm}
         {this.state.failedSelect ? selectValue : ""}
         {this.state.failedWriteGoal ? writeGoal: ""}
        <Row >
          <BacklogColumn goalsArr={this.state.goalsArr}/>
          <PriorityColumn/>
          <TodayColumn/>
          <CompleteColumn/>
          </Row>
        </div>
      </div>
    );
  }
}

LifeGoals.propTypes = {
  userStore: React.PropTypes.object,
  goalStore: React.PropTypes.object
};

export default inject ('userStore', 'goalStore') (observer (LifeGoals));
