import {
  ACTION_PRE,
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  SET_FILTER,
  REMOVE_FILTER
} from '../types';

export default ( state, action ) => {
  switch( action.type ) {
    case ACTION_PRE:
      return { ...state, loading: true };
    case GET_CONTACTS:
      return { ...state, contacts: action.payload, loading: false };
    case ADD_CONTACT:
      return { ...state, contacts: [action.payload, ...state.contacts ], loading:false };
    case DELETE_CONTACT:
      return { ...state, contacts: state.contacts.filter( contact => contact._id !== action.payload ), loading: false, current: null};
    case SET_CURRENT:
      return { ...state, loading: false, current: action.payload};
    case UPDATE_CONTACT:
      return { ...state, loading: false, current: null, contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact )};
    case SET_FILTER:
      return { ...state, loading: false, current: null, 
              filtedContacts: state.contacts.filter( contact => {
                              const text = action.payload;
                              const pattern = RegExp(text,'ig');
                              return pattern.test(contact.name) || pattern.test(contact.email);
                            })};
    case REMOVE_FILTER:
      return { ...state, loading: false, current:null, filtedContacts: null};
    default: return state;
  }
};
