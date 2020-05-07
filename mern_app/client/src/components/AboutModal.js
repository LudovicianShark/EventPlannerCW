import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  NavLink,
} from "reactstrap";

//aboutModal view class
class aboutModal extends Component {
  state = {
    modal: false,
  };

  //Toggle state
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {};

  //Toggle on/off modal view
  onSubmit = (e) => {
    this.toggle();
  };

  //Render aboutModal view
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
                <Label for="name" className="h3">
                  The CW Events Website
                </Label>
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

//export aboutModal
export default aboutModal;
