import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import {
  REGISTER_PRE,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_PRE,
  LOGIN_PRE_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER
} from '../types';

const sleep = ms => new Promise( res => setTimeout(res, ms));

const AuthState = props => {

  const initState = {
    user: null,
    isAuthenticated: null,
    isRegistering: null,
    isRegisterSuccess: null,
    isLogining: null,
    msg: null,
    token: null
  };

  const [ state, dispatch ] = useReducer(AuthReducer, initState);

  const login = async user => {
    dispatch({ type: LOGIN_PRE });

    const config = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
    };

    try {
      const _data = await fetch('/api/auth', config); 
      const data = await _data.json();
      if (data.token) {
        dispatch({type: LOGIN_PRE_AUTH, payload: data.token});
      }
      else if (data.msg) {
        dispatch({type: LOGIN_FAIL, payload: data.msg});
      }
    }
    catch (err) {
      dispatch({ type: LOGIN_FAIL, payload:'Login Failed' });
    }
  };

  const logout = () => {
    dispatch( { type: LOGOUT } );
  };

  const register = async user => {
    dispatch({type: REGISTER_PRE});
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };
    try {
      const _data = await fetch('/api/register', config); 
      const data = await _data.json();
      if (data.token) {
        dispatch({type: REGISTER_SUCCESS, payload: data.token});
      }
      else if (data.msg) {
        dispatch({type: REGISTER_FAIL, payload: data.msg});
      }
    }
    catch (err) {
      dispatch({type: REGISTER_FAIL, payload: 'Register fail'});
    }
  }

  const loadUser = async () => {
    const { token } = state;
    if (!token) dispatch({type: LOGIN_FAIL, msg: 'Authenticated Failed - No Token'});
    const config = {
      headers: {
        'x-auth-token': token
      }
    }
    try {
      const _data = await fetch('/api/auth', config);
      const data = await _data.json();
      dispatch({type: LOGIN_SUCCESS, payload: data});
    }
    catch (err) {
      dispatch({type: LOGIN_FAIL, msg: 'Authenticated Failed'});
    }
  };
  
  return (
          <AuthContext.Provider
            value={{
              user: state.user,
              isRegistering: state.isRegistering,
              isRegisterSuccess: state.isRegisterSuccess,
              isLogining: state.isLogining,
              isAuthenticated: state.isAuthenticated,
              msg: state.msg,
              token: state.token,
              login,
              logout,
              register,
              loadUser
            }}
          >
            {props.children}
          </AuthContext.Provider>
        )
  
};

export default AuthState;
