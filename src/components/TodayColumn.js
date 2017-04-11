import React from 'react';
import {Col} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

class TodayColumn extends React.Component{
  render(){
    let todayGoals = this.props.goalStore.goalsArr.filter(goal => goal.status == 'today');
    let displayTodayColumnGoals = todayGoals.map((goal, index) =>
        ( <div key={index} style={{padding:"15px", borderRadius: "15px", background:"#ededed", border:'1px solid black', width:'100%', textAlign: 'center', marginTop: '1vh', marginBottom: '1vh'}}>
            <h4 style={{color: `${this.props.goalStore.cardColor(goal)}`}}>{goal.value}</h4>
              <p>{goal.lifeGoal}</p>
              <div style={{display:'flex', justifyContent: 'space-between'}}>
                <button onClick={this.props.goalStore.makePriority.bind(null, goal)} style={{border:'none', background:'#ededed'}}><i className="fa fa-arrow-left fa-lg" aria-hidden="true"></i></button>
                <button onClick={this.props.goalStore.makeComplete.bind(null, goal)} style={{border:'none', background:'#ededed'}}><i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i></button>
              </div>
          </div>)
      );
    return(
        <Col md={3}>
          <h3 className="column-labels">
            {this.props.goalStore.columnLabels[2].toUpperCase()}
          </h3>
          {displayTodayColumnGoals}
        </Col>
    );
  }
}

TodayColumn.propTypes = {
  goalStore: React.PropTypes.object
};

export default inject('goalStore')(observer(TodayColumn));
