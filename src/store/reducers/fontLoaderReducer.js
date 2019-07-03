import * as Actions from '../actions';

const INITIAL_STATE = {
  loadingFonts: false
};

export default function fontLoaderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.LOADING_FONTS_PENDING:
      return { ...state, loadingFonts: true };
    case Actions.LOADING_FONTS_FINISHED:
      return { ...state, loadingFonts: false };
    default:
      return state;
  }
};