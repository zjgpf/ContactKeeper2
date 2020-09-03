import {
  ADD_ALERT,
  REMOVE_ALERT
} from '../types';

export default ( state, action ) => {
  switch( action.type ) {
    case ADD_ALERT:
      return [ ...state, action.payload ];
    case REMOVE_ALERT:
      return state.filter( item => item.id !== action.payload );
    default: return state;
  }
};
