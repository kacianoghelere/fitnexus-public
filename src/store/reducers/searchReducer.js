import * as Actions from '../actions';

const INITIAL_STATE = {
  searching: false,
  term: '',
  results: []
};

export default function searchReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SEARCHING_USERS:
      return {
        ...state,
        searching: true
      };
    case Actions.RESET_SEARCH_RESULTS:
      return INITIAL_STATE;
    case Actions.SET_SEARCH_TERM:
      return {
        ...state,
        term: action.term
      };
    case Actions.SET_SEARCH_RESULTS:
      return {
        ...state,
        searching: false,
        results: action.results
      };
    default:
      return state;
  }
};