import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class DisplayLifeGoals extends React.Component{

  render(){ // easier to read if your lines aren't as long as #8 below
    let goals = this.props.goalsArr.map((goal, index) =>
        (<ListGroupItem className="list-item" key={index} header={goal.value}>{goal.lifeGoal}</ListGroupItem>)
      );

    if(this.props.goalsArr.length > 0){
      return(
        <div>
          <ListGroup className="list-group1">
            {goals}
          </ListGroup>
        </div>
      );
    } else {
      return(
        <div>
        <h4>Goals will display below</h4>
        </div>
      );
    }
  }
}

DisplayLifeGoals.propTypes = {
  goalsArr: React.PropTypes.array
};
