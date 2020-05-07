import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

//Import RegisterModal and aboutModal for view use
import RegisterModal from "./auth/RegisterModal";
import AboutModal from "./AboutModal";

//App navbar class
class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  //Toggle state
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  //Render App navbar
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">The CW Event Planner</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <AboutModal />
                </NavItem>
                <NavItem>
                  <RegisterModal />
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

//export app navbar
export default AppNavbar;
