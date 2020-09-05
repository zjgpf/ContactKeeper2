import {
  REGISTER_PRE,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_PRE,
  LOGIN_PRE_AUTH,
  LOGOUT
} from '../types';

export default ( state, action ) => {
  switch( action.type ) {
    case REGISTER_PRE:
      return { ...state, isRegistering: true };
    case REGISTER_SUCCESS:
      return { ...state, msg: 'Register Success', isRegistering: false, isRegisterSuccess: true, token: action.payload };
    case LOGIN_PRE_AUTH:
      return { ...state, token: action.payload };
    case REGISTER_FAIL:
      return { ...state, msg: action.payload, isRegistering: false, isRegisterSuccess: false };
    case LOGIN_PRE:
      return { ...state, isLogining: true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, msg: null, isLogining: false };
    case LOGIN_FAIL:
      return { ...state, user: null, isAuthenticated: false, msg: action.payload, isLogining: false };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: null, msg: null, token: null };
    default: return state;
  }
};
