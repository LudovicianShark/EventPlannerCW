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
  Alert,
} from "reactstrap";
//import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAutheticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAutheticated } = this.props;
    if (error !== prevProps.error) {
      //checkfor reg error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if (this.state.modal) {
      if (isAutheticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    //Create user object
    const newUser = {
      name,
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
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Username"
                  onChange={this.onChange}
                ></Input>
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

export default connect(mapStatToProps, { register, clearErrors })(
  RegisterModal
);
