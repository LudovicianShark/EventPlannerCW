import React, {Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types';
import Moment from 'moment';
import Image from 'react-bootstrap/Image';
import img from '../images/rect.png';


class ShoppingList extends Component {

    
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        const { items } = this.props.item;
        Moment.locale('en');
        return(
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({ _id, name, type, eventDate, startTime, endTime, description}) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button 
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, _id)}
                                >&times;
                                </Button>
                                <img src={img} alt="Logo" className="images" />
                                <h2>{name}</h2> <h5>Show Type: {type}</h5>
                                <h6>Event Date: {Moment({eventDate}).format('DD/MM/YYYY')}</h6> <p>Start: {startTime} Finish: {endTime}</p> <p className="desc-p">Description: </p><p>{description}</p>
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
        );
    }
}


ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({ 
    item: state.item
});


export default connect(
    mapStateToProps, 
    { getItems, deleteItem })
    (ShoppingList);