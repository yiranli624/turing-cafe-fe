import React, { Component } from 'react';
import './App.css';
import { apiCalls } from '../apiCalls';
import ReservationCard from '../Component/ReservationCard';
import Form from '../Component/Form';

class App extends Component {
  constructor() {
    super();
    this.state = {
      reservations: [],
      error: ''
    }
  }

  componentDidMount() {
    this.getReservations();
  }

  getReservations = () => {
    apiCalls.getReservations()
      .then(data => this.setState({ reservations: data }))
      .catch(err => this.setState({ error: err.message }))
  }

  getNewReservation = (newReservation) => {
    apiCalls.addReservation(newReservation)
      .then(() => this.getReservations())
  }

  removeReservation = (id) => {
    apiCalls.removeReservation(id)
      .then(() => this.getReservations())
  }


  render() {
    return (
      <div className="App">
        <h1 className='app-title'>Turing Cafe Reservations</h1>
        <div className='resy-form'>
          <Form getNewReservation={this.getNewReservation} />
        </div>
        <div className='resy-container'>
          <ReservationCard reservations={this.state.reservations} removeReservation={this.removeReservation} />
        </div>
      </div>
    )
  }
}

export default App;
