import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/app.navbar'
import EventList from './components/EventList'
import ItemModal from './components/itemModal'
import  { Contantainer, Container } from 'reactstrap'

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppNavbar />
      <Container>
      <ItemModal />
      <EventList />
      </Container>
    </div>
    </Provider>
  );
}

export default App;
