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

    const newItem = {
      name: this.state.name,
      type: this.state.type,
      eventDate: this.state.eventDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description,
    };

    //Add item from addItem action
    this.props.addItem(newItem);

    //Close Modal
    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Item
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Add Event To The Planner
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Event Name</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add Event Name"
                  onChange={this.onChange}
                />
                <Label for="type">Event Type</Label>
                <Input
                  style={{ marginBottom: "0.5rem" }}
                  type="select"
                  name="type"
                  id="item"
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
