import * as Actions from '../actions';

const INITIAL_STATE = {
  fetching: false,
  list: []
};

export default function selectedUserEvolutionsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.FETCHING_USER_EVOLUTIONS:
      return {
        ...state,
        fetching: true
      };
    case Actions.RESET_SELECTED_USER:
      return {
        ...state,
        fetching: false,
        user: null
      };
    case Actions.SET_SELECTED_USER_EVOLUTIONS:
      return {
        ...state,
        fetching: false,
        list: action.evolutions
      };
    default:
      return state;
  }
};