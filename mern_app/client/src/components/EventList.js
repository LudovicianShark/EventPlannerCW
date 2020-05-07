import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import Moment from "moment";
import img from "../images/LMusic.jpg";

//Event List component
class EventList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  //Delete button click fn=unction
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  //Render event list view, large bulk of wep application
  render() {
    const { items } = this.props.item;
    Moment.locale("en");
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="event-list">
            {items.map(
              ({
                _id,
                name,
                type,
                eventDate,
                startTime,
                endTime,
                description,
              }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                    <img src={img} alt="Logo" className="images" />
                    <h2>{name}</h2> <h5>Show Type: {type}</h5>
                    <h6>
                      Event Date: {Moment({ eventDate }).format("DD/MM/YYYY")}
                    </h6>{" "}
                    <p className="desc-p">Start: {startTime} </p>{" "}
                    <p> Finish: {endTime}</p>{" "}
                    <p className="desc-p">Description: </p>
                    <p>{description}</p>
                  </ListGroupItem>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

EventList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

//Event List export
export default connect(mapStateToProps, { getItems, deleteItem })(EventList);
