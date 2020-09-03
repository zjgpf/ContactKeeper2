import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { v4 } from 'uuid';
import {
  ADD_ALERT,
  REMOVE_ALERT
} from '../types';

const AlertState = props => {

  const initState = [];

  const [ state, dispatch ] = useReducer(AlertReducer, initState);

  const addAlert = ({ msg, bg }) => {
    const id = v4();
    dispatch( {type: ADD_ALERT, payload: { id, msg, bg } } );
    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id }), 3000);
  };

  return (
          <AlertContext.Provider
            value={{
              alerts: state,
              addAlert
            }}
          >
            {props.children}
          </AlertContext.Provider>
        )
};

export default AlertState;
