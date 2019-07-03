import { searchForUsers } from '../../util/database';

export const RESET_SEARCH_RESULTS = 'RESET_SEARCH_RESULTS';

export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export function setSearchResults(results) {
  return {
    type: SET_SEARCH_RESULTS,
    results
  };
};

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export function setSearchTerm(term) {
  return {
    type: SET_SEARCH_TERM,
    term
  };
};

export const SEARCHING_USERS = 'SEARCHING_USERS';

export function setSearchingUsers() {
  return { type: SEARCHING_USERS };
};

export function executeSearch() {
  return async (dispatch, getState) => {
    const { term } = getState().search;

    if (term) {
      dispatch(setSearchingUsers());

      const results = await searchForUsers(term);

      return dispatch(setSearchResults(results));
    }
  };
};