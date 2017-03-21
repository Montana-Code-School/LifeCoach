import React from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import {NavbarHeader, NavbarToggle, NavbarCollapse, NavbarBrand} from 'react-bootstrap/lib/NavbarHeader';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // JSX Indenting below needs attention - HAROLD
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
          <Navbar.Brand>
          <Link to="/">Life Coach</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{pathname: '/wheel'}}><NavItem>Value Wheel</NavItem></LinkContainer>
              <LinkContainer to={{pathname: '/lifegoals'}}><NavItem>Life Goals</NavItem></LinkContainer>
              <LinkContainer to={{pathname: '/history'}}><NavItem>History</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight className="nav-bar-right">
              <Navbar.Text>Welcome, {this.props.userStore.firstName}!</Navbar.Text>
              <LinkContainer onClick={this.props.userStore.logUserOut} to={{pathname: '/entrypage'}}><NavItem>Logout</NavItem></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
Navigation.propTypes = {
  userStore: React.PropTypes.object,
  logUserOut: React.PropTypes.func
};

export default inject("userStore")(observer(Navigation));
