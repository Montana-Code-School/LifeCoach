import React from 'react';
import {Col} from 'react-bootstrap';
import DisplayLifeGoals from './DisplayLifeGoals';
import { inject, observer } from 'mobx-react';

class PriorityColumn extends React.Component{
  render(){
    let priorityGoals = this.props.goalStore.goalsArr.filter(goal => goal.status == 'priority');
    let displayPriorityColumnGoals = priorityGoals.map((goal, index) =>
        ( <div key={index} style={{border:'1px solid black', width:'100%', textAlign: 'center', marginTop: '1vh', marginBottom: '1vh'}}>
            <h4>{goal.value}</h4>
              <p>{goal.lifeGoal}</p>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <button  bsStyle="primary"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                <button  bsStyle="primary"><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
              </div>
          </div>)
      );
    if(this.props.goalStore.goalsArr.filter(goal => goal.status == 'priority').length > 0){
      return(
          <Col md={3} style={{
            border: '1px solid black'
          }}>
            {displayPriorityColumnGoals}
          </Col>
      );
    } else {
      return(
        <Col md={3} style={{
          border: '1px solid black'}}>
          <h4>Priority goals will display below</h4>
        </Col>
      );
    }
  }
}

PriorityColumn.propTypes = {
  goalStore: React.PropTypes.object
};

export default inject('goalStore')(observer(PriorityColumn));