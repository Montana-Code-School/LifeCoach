import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col} from 'react-bootstrap';


class History extends React.Component{

  render(){
    // indenting... -- HAROLD
    let eachWheel = this.props.wheelStore.wheels.map(wheel =>
    <div key={wheel._id}>
      <Row>
        <Col md={6}>
          {wheel.value1}
        </Col>
        <Col md={6}>
          {wheel.score1}
        </Col>
      </Row>
    </div>
  );
    return (
      <div>
        {eachWheel}
      </div>
    );
  }
}

History.propTypes = {
  wheelStore: React.PropTypes.object
};

export default inject('wheelStore')(observer(History));
