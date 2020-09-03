import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  ACTION_PRE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER
} from '../types';

const sleep = ms => new Promise( res => setTimeout(res, ms));

const AuthState = props => {

  const initState = {
    user: null,
    loading: null,
    isAuthenticated: null
  };


  const [ state, dispatch ] = useReducer(AuthReducer, initState);

  const login = async user => {
    const { email, password } = user;
    dispatch({ type: ACTION_PRE });
    await sleep(3000);
    const data = {
      name: 'user1'
    };
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    //dispatch({ type: LOGIN_FAIL, payload: {msg: 'Invalid User'} });
  };

  const logout = () => {
    dispatch( { type: LOGOUT } );
  };

  const register = async user => {
    dispatch({type: ACTION_PRE});
    await sleep(3000);
    const data = { name: 'user2' };
    dispatch({type: LOGIN_SUCCESS, payload: data});
  }
  
  return (
          <AuthContext.Provider
            value={{
              user: state.user,
              loading: state.loading,
              isAuthenticated: state.isAuthenticated,
              login,
              logout,
              register
            }}
          >
            {props.children}
          </AuthContext.Provider>
        )
  
};

export default AuthState;
