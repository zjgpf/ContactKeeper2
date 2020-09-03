import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTION_PRE,
  LOGOUT
} from '../types';

export default ( state, action ) => {
  switch( action.type ) {
    case ACTION_PRE:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true, error: null, loading: false };
    case LOGIN_FAIL:
      return { ...state, user: null, isAuthenticated: false, error: action.payload, loading: false };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: null, error: null, loading: false };
    default: return state;
  }
};
