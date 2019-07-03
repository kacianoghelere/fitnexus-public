import * as Actions from '../actions';

const INITIAL_STATE = {
  pending: false,
  user: null,
  followedIds: [],
  followerIds: []
};

export default function authenticationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_AUTHENTICATION_PENDING:
      return { ...state, pending: true };
    case Actions.SET_AUTHENTICATION_REJECTED:
      return { ...state, pending: false };
    case Actions.SET_AUTHENTICATED_USER:
      return {
        ...state,
        pending: false,
        user: action.user
      };
    case Actions.FOLLOW_USER:
      return {
        ...state,
        followedIds: [ ...state.followedIds, action.userUid ]
      };
    case Actions.UNFOLLOW_USER:
      return {
        ...state,
        followedIds: state.followedIds.filter((uid) => uid !== action.userUid)
      };
    case Actions.SET_FOLLOWER_IDS:
      const { followerIds } = action;

      return { ...state, followerIds };
    case Actions.SET_FOLLOWED_IDS:
      const { followedIds } = action;

      return { ...state, followedIds };
    default:
      return state;
  }
};