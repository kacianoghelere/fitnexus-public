import * as Actions from '../actions';

const INITIAL_STATE = {
  loading: false,
  content: []
};

export default function notificationsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_FETCHING_NOTIFICATIONS:
      return {
        ...state,
        loading: true
      };
    case Actions.SET_NOTIFICATIONS_LOADED:
      return {
        ...state,
        loading: false
      };
    case Actions.RESET_NOTIFICATIONS:
      return {
        ...state,
        content: [],
        loading: false
      };
    case Actions.ADD_NOTIFICATION:
      return {
        ...state,
        content: [...state.content, action.notification]
      };
    default:
      return state;
  }
};