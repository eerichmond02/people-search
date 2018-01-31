import React from 'react';
import './PeopleSearch.css';
import { connect } from 'react-redux';
import { displayUser, updateInput } from './state/actions'
import PropTypes from 'prop-types';

const List = (props) => {

  let showUsers = [];

  if (props.input.trim() !== '') {
	  showUsers = props.users.filter(user => {
    	return user.name.toLowerCase().includes(props.input.toLowerCase());
  	});
  } else {
  	showUsers = props.users;
  }

	return (
		<div id='list'>
			<input placeholder='search' name='inputVal' onChange={props.updateInput}></input>
			<br />
      <div id='nameList'>
      	{showUsers.map((user, idx) => (
      		<button key={user.id} className='userName' onClick={() => props.displayUser(user.id)}>{user.name}</button>
      	))}
      </div>
		</div>
	)
}

List.propTypes = {
  input: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  displayUser: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired
};

const UserInfo = (props) => {
	return (
		<div id='info'>
			<h1 id='name'>{props.selected.name}</h1>
			<p className='userInfo'>City: {props.selected.city}</p>
			<p className='userInfo'>Industry: {props.selected.industry}</p>
			<p className='userInfo'>Hobbies: props.selected.hobbies}</p>
			<p className='userInfo'>Email: {props.selected.email}</p>
		</div>
	)
}

UserInfo.propTypes = {
  selected: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return (
		{
			users: state.users,
			selected: state.selected,
			input: state.input
		}
	)
}

const mapDispatchToProps = (dispatch) => {
	return (
		{
			displayUser: id => {
				dispatch(displayUser(id));
			},
			updateInput: e => {
				dispatch(updateInput(e.target.value));
			}
		}
	)
}

export const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);
export const ConnectedUserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfo);
