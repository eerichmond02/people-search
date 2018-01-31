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
      		<button key={user.id} id={user.id} className='userName' onClick={props.displayUser}>{user.name}</button>
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
	let user;
	for (let i = 0; i < props.users.length; i++) {
		if (props.users[i].id === props.selected) { user = props.users[i];}
	}
	return (
		<div id='info'>
			<h1 id='name'>{user.name}</h1>
			<p className='userInfo'>City: {user.city}</p>
			<p className='userInfo'>Industry: {user.industry}</p>
			<p className='userInfo'>Hobbies: {user.hobbies}</p>
			<p className='userInfo'>Email: {user.email}</p>
		</div>
	)
}

UserInfo.propTypes = {
  users: PropTypes.array.isRequired
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
			displayUser: e => {
				dispatch(displayUser(e.target.id));
			},
			updateInput: e => {
				dispatch(updateInput(e.target.value));
			}
		}
	)
}

export const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(List);
export const ConnectedUserInfo = connect(mapStateToProps, mapDispatchToProps)(UserInfo);
