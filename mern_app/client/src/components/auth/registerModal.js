import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from "reactstrap";
//import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";

import propTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";

//import DatePicker from "react-datepicker";

class RegisterModal extends Component {
  state = {
    modal: false,
    uName: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAutheticated: propTypes.bool,
    error: propTypes.object.isRequired,
    register: propTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.uName]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { uName, email, password } = this.state;

    //Create user object
    const newUser = {
      uName,
      email,
      password,
    };

    this.props.register(newUser);
  };
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Account Registration</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="uName">Name</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="text"
                  name="uName"
                  id="uName"
                  placeholder="Username"
                  onChange={this.onChange}
                />
                <Label for="email">Email</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email address"
                  onChange={this.onChange}
                ></Input>
                <Label for="password">Password</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onChange}
                  placeholder="Password"
                ></Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStatToProps = (state) => ({
  isAutheticated: state.auth.isAutheticated,
  error: state.error,
});

export default connect(mapStatToProps, { register })(RegisterModal);
