import * as Actions from '../actions';

const INITIAL_STATE = {
  fetching: false,
  user: null,
  followers: [],
  followeds: []
};

export default function selectedUserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.FETCHING_USER:
      return {
        ...state,
        fetching: true
      };
    case Actions.SET_SELECTED_USER:
      return {
        ...state,
        fetching: false,
        user: action.user
      };
    case Actions.SET_USER_FOLLOWERS:
      return {
        ...state,
        followers: action.followers
      };
    case Actions.SET_USER_FOLLOWEDS:
      return {
        ...state,
        followeds: action.followeds
      };
    case Actions.RESET_SELECTED_USER:
      return INITIAL_STATE;
    case Actions.FOLLOW_USER:
      return {
        ...state,
        followers: [ ...state.followers, action.follower ]
      };
    case Actions.UNFOLLOW_USER:
      return {
        ...state,
        followers: state.followers.filter(({ uid }) => uid != action.follower.uid)
      };
    default:
      return state;
  }
};