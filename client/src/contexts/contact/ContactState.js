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

const contacts = [
  {
    _id: '1',
    name: 'test1',
    email: 'test1@gmail.com',
    phone: '111-111-111',
    type: 'personal'
  },
  {
    _id: '2',
    name: 'test2',
    email: 'test2@gmail.com',
    phone: '111-111-222',
    type: 'professional'
  },
  {
    _id: '3',
    name: 'test3',
    email: 'tes31@gmail.com',
    phone: '111-111-333',
    type: 'personal'
  }
];

const ContactState = props => {

  const initState = {
    contacts: [],
    filtedContacts: null,
    loading: null,
    current: null
  };

  const [ state, dispatch ] = useReducer(ContactReducer, initState);

  const getContacts = async ()=> {
    dispatch({type: CONTACT_ACTION_PRE})   
    await sleep(3000);
    dispatch({type: GET_CONTACTS, payload: contacts});
  };

  const addContact = async contact=> {
    await sleep(3000);
    const _id = v4();
    dispatch({type: ADD_CONTACT, payload:{...contact, _id}});
  };

  const updateContact = async contact=> {
    await sleep(3000);
    dispatch({type: UPDATE_CONTACT, payload:contact})
  };

  const deleteContact = async _id=> {
    await sleep(3000);
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
