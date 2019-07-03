import * as Actions from '../actions';

const INITIAL_STATE = {
  loading: false,
  loaded: false,
  content: []
};

export default function timelineReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_FETCHING_TIMELINE:
      return { ...state, loading: true };
    case Actions.SET_TIMELINE_LOADED:
      return { ...state, loading: false, loaded: true };
    case Actions.ADD_TIMELINE_CONTENT:
      return {
        ...state,
        content: [...state.content, action.content]
      };
    case Actions.SET_TIMELINE_CONTENT:
      return {
        ...state,
        content: action.content,
        loading: false
      };
    case Actions.RESET_TIMELINE_CONTENT:
      return INITIAL_STATE;
    case Actions.ADD_LIKE_TO_POST:
      return {
        ...state,
        content: state.content.map((post) => {
          if (post.uid === action.postUid) {
            const likees = [...post.likees, action.userUid];

            return { ...post, likees };
          };

          return post;
        })
      };
    case Actions.REMOVE_LIKE_FROM_POST:
      return {
        ...state,
        content: state.content.map((post) => {
          if (post.uid == action.postUid) {
            return {
              ...post,
              likees: post.likees.filter((likee) => likee !== action.userUid)
            };
          };

          return post;
        })
      };
    default:
      return state;
  }
};