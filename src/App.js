import React, { Component } from 'react';
import './App.css';
import {ConnectedList, ConnectedUserInfo } from './PeopleSearch';
import { deselect } from './state/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends Component {
  render() {

    let display;

    if (!this.props.selected) {
      display = (<ConnectedList />)
    } else {
      display = (
        <div >
          <button id='backButton' onClick={this.props.deselect}>Back</button>
          <br />
          <div id='infoDiv'>
            <ConnectedUserInfo />
          </div>
        </div>
      )
    }
    return (
      <div className="App">
        {display}
      </div>
    );
  }
}

App.propTypes = {
  selected: PropTypes.string.isRequired,
  deselect: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return (
    {
      selected: state.selected,
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return (
    {
      deselect: () => {
        dispatch(deselect());
      }
    }
  )
}

export default App = connect(mapStateToProps, mapDispatchToProps)(App);
