import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import { v4 } from 'uuid';
import {
  CONTACT_ACTION_PRE,
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  SET_FILTER,
  REMOVE_FILTER
} from '../types';

const sleep = ms => new Promise(res => setTimeout(res, ms));

//const contacts = [
//  {
//    _id: '1',
//    name: 'test1',
//    email: 'test1@gmail.com',
//    phone: '111-111-111',
//    type: 'personal'
//  },
//  {
//    _id: '2',
//    name: 'test2',
//    email: 'test2@gmail.com',
//    phone: '111-111-222',
//    type: 'professional'
//  },
//  {
//    _id: '3',
//    name: 'test3',
//    email: 'tes31@gmail.com',
//    phone: '111-111-333',
//    type: 'personal'
//  }
//];

const ContactState = props => {

  const initState = {
    contacts: [],
    filtedContacts: null,
    loading: null,
    current: null
  };

  const [ state, dispatch ] = useReducer(ContactReducer, initState);

  const getContacts = async token => {
    dispatch({type: CONTACT_ACTION_PRE})   
    const config = {
      headers: {
        'x-auth-token': token
      }
    };
    try {
      const _data = await fetch('/api/contacts', config);
      const contacts = await _data.json();
      dispatch({type: GET_CONTACTS, payload: contacts});
    }
    catch (err) {
      console.error('Get contacts error');
    }
  };

  const addContact = async (contact, token)=> {
    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type':'application/json'
      },
      method: 'POST',
      body: JSON.stringify(contact)
    };
    try {
      const _data = await fetch('/api/contacts', config);
      const data = await _data.json();
      dispatch({type: ADD_CONTACT, payload: data});
    }
    catch (err) {
      console.error('Add contact error'); 
    }
  };

  const updateContact = async (contact, token)=> {
    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(contact)
    };
    try {
      const _data = await fetch(`/api/contacts/${contact._id}`, config);
      contact = await _data.json();
      dispatch({type: UPDATE_CONTACT, payload:contact})
    }
    catch (err) {
      console.error('Update contact error');
    }
  };

  const deleteContact = (_id, token)=> {
    const config = {
      headers: {
        'x-auth-token': token
      },
      method: 'DELETE'
    };
    fetch(`/api/contacts/${_id}`, config);
    dispatch({type: DELETE_CONTACT, payload: _id});
  };

  const setCurrent = current=> {
    dispatch({type: SET_CURRENT, payload: current}); 
  };

  const filter = text=> {
    if (text === '') dispatch({type: REMOVE_FILTER});
    else dispatch({type: SET_FILTER, payload: text});
  };

  return (
          <ContactContext.Provider
            value={{
              contacts: state.contacts,
              filtedContacts: state.filtedContacts,
              loading: state.loading,
              current: state.current,
              getContacts,
              addContact,
              setCurrent,
              updateContact,
              deleteContact,
              filter
            }}
          >
            {props.children}
          </ContactContext.Provider>
        )
};

export default ContactState;
