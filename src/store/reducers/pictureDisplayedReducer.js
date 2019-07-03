import * as Actions from '../actions';

const INITIAL_STATE = {};

export default function pictureDisplayedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.RESET_DISPLAYED_PICTURE:
      return {};
    case Actions.SET_DISPLAYED_PICTURE:
      return {...action.picture};
    default:
      return state;
  }
};