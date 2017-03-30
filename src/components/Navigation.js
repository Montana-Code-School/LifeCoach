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

      <div className="navigationBar">
        <Navbar inverse collapseOnSelect id="nav-margin">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/" className="lifecoach-header">Life Coach</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={{pathname: '/wheel'}}><NavItem><i className="fa fa-pie-chart" aria-hidden="true"></i></NavItem></LinkContainer>
              <LinkContainer to={{pathname: '/lifegoals'}}><NavItem><i className="fa fa-heart" aria-hidden="true"></i></NavItem></LinkContainer>
              <LinkContainer to={{pathname: '/history'}}><NavItem><i className="fa fa-database" aria-hidden="true"></i></NavItem></LinkContainer>
            </Nav>
            <Nav pullRight className="nav-bar-right">
              <Navbar.Text><i className="fa fa-user" aria-hidden="true"></i> Welcome, {this.props.userStore.firstName}!</Navbar.Text>
              <LinkContainer onClick={this.props.userStore.logUserOut} to={{pathname: '/entrypage'}}><NavItem><i className="fa fa-sign-out" aria-hidden="true"></i></NavItem></LinkContainer>
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
