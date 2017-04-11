import React from 'react';
import {Col} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

class BacklogColumn extends React.Component{
  render(){
    let backlogGoals = this.props.goalStore.goalsArr.filter(goal => goal.status == 'goals');
    let displayBacklogGoals = backlogGoals.map((goal, index) =>
        ( <div key={index} style={{border:'1px solid black', width:'100%', padding:"15px",
          borderRadius: "15px", background:"#ededed",  textAlign: 'center', marginTop: '1vh', marginBottom: '1vh'}}>
            <h4 style={{color: `${this.props.goalStore.cardColor(goal)}`}}>{goal.value}</h4>
              <p>{goal.lifeGoal}</p>
              <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <button onClick={this.props.goalStore.makePriority.bind(null, goal)}
                style={{border:'none', background:'#ededed'}}><i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i></button>
              </div>
          </div>)
      );

    if(this.props.goalStore.goalsArr.filter(goal => goal.status == 'goals').length > 0){
      return(
            <Col md={3}>
              <h3 className="column-labels">
                {this.props.goalStore.columnLabels[0].toUpperCase()}
              </h3>
              {displayBacklogGoals}
            </Col>
      );
    } else {
      return(
          <Col md={3}>
          <h3 className="column-labels">
            {this.props.goalStore.columnLabels[0].toUpperCase()}
          </h3>
            <h4>New goals will display below</h4>
          </Col>
      );
    }
  }
}

BacklogColumn.propTypes = {
  goalStore: React.PropTypes.object
};

export default inject('goalStore')(observer(BacklogColumn));
