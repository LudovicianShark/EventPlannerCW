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
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

class aboutModal extends Component {
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
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {};

  onSubmit = (e) => {
    this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          About
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>About</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">The CW Events Website</Label>
                <p className="desc-p">
                  This website is used by employees of the CW venue to view and
                  edit upcoming events at the CW.
                </p>
                <p className="desc-p">
                  Non-autherised users may only look at the events that are on
                  the page while autherised users can add events by detailing:
                  the name of the event, the type of event, the event date, the
                  start time, the end time and a description!
                </p>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Close
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default aboutModal;
