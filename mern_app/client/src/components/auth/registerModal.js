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
  NavLink
} from "reactstrap";
//import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";

import PropTypes from ('prop-types');
import { connect } from "react-redux";

//import DatePicker from "react-datepicker";

class RegisterModal extends Component {
  state = {
    modal: false,
    uName: "",
    email: '',
    password: '',
    msg: null
    };
    
    static propTypes = {
        isAutheticated: propTypes.bool,
        error: propTypes.object.isRequired
    }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value,
      [e.target.type]: e.target.value,
      [e.target.eventDate]: e.target.value,
      [e.target.startTime]: e.target.value,
      [e.target.endTime]: e.target.value,
      [e.target.description]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    //Close Modal
    this.toggle();
  };
  render() {
    return (
      <div>
            <NavLink onClick={this.toggle} href="#">
                Register
            </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Account Registration
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">User Name</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Add User Name Name"
                  onChange={this.onChange}
                />
                <Label for="type">Email</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="email"
                  name="email"
                                id="email"
                                placeholder="email address"

                  onChange={this.onChange}
                >
                  <option hidden>Select Event Type</option>
                  <option>Live Music</option>
                  <option>Musical</option>
                  <option>Pantomime</option>
                  <option>Theatre Production</option>
                  <option>Comedy Show</option>
                </Input>
                <Label for="eventDate">Date of Event</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="date"
                  name="eventDate"
                  id="item"
                  onChange={this.onChange}
                ></Input>
                <Label for="startTime">Event Start Time (24h)</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="time"
                  name="startTime"
                  defaultValue="00:00"
                  onChange={this.onChange}
                ></Input>
                <Label for="endTime">Event End Time (24h)</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  label="Event End Time"
                  type="time"
                  name="endTime"
                  defaultValue="00:00"
                  onChange={this.onChange}
                ></Input>
                <Label for="description">Enter an event description</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="string"
                  name="description"
                  id="item"
                  onChange={this.onChange}
                  placeholder="Please enter a description"
                ></Input>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
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
    error: state.error
});

export default connect(mapStatToProps, {  })(RegisterModal);
