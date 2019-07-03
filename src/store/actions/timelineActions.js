import firebase from '../../config/firebase';
import {
  getFollowedUsersUids,
  getUser,
  getUserEvolutions
} from '../../util/database';

const database = firebase.database().ref();

export const SET_FETCHING_TIMELINE = 'SET_FETCHING_TIMELINE';

export function setFetchingTimeline() {
  return { type: SET_FETCHING_TIMELINE };
};

export const SET_TIMELINE_LOADED = 'SET_TIMELINE_LOADED';

export function setTimelineLoaded() {
  return { type: SET_TIMELINE_LOADED };
};

export const SET_TIMELINE_CONTENT = 'SET_TIMELINE_CONTENT';

export function setTimelineContent(content) {
  return {
    type: SET_TIMELINE_CONTENT,
    content
  };
};

export const ADD_TIMELINE_CONTENT = 'ADD_TIMELINE_CONTENT';

export function addTimelineContent(content) {
  return {
    type: ADD_TIMELINE_CONTENT,
    content
  };
};

export const RESET_TIMELINE_CONTENT = 'RESET_TIMELINE_CONTENT';

export function resetTimelineContent() {
  return { type: RESET_TIMELINE_CONTENT };
};

export function refreshTimeline() {
  return async (dispatch, getState) => {
    const { user: authUser } = getState().authentication;

    const addEvolutionsToTimeline = async (userUid) => {
      const user = await getUser(userUid);

      const evolutions = await getUserEvolutions(userUid);

      evolutions.forEach((evolution) => {
        dispatch(addTimelineContent({
          ...evolution,
          userAvatar: user.avatar,
          userUid,
          userName: user.name
        }));
      });
    };

    dispatch(resetTimelineContent());

    dispatch(setFetchingTimeline());

    await addEvolutionsToTimeline(authUser.uid);

    const followedUsersKeys = await getFollowedUsersUids(authUser.uid);

    await followedUsersKeys.forEach(async (userUid) => {
      await addEvolutionsToTimeline(userUid);
    });

    dispatch(setTimelineLoaded());
  }
}

export const ADD_LIKE_TO_POST = 'ADD_LIKE_TO_POST';

export function addLikeToPost(userUid, postUid) {
  return {
    type: ADD_LIKE_TO_POST,
    userUid,
    postUid
  };
};

export const REMOVE_LIKE_FROM_POST = 'REMOVE_LIKE_FROM_POST';

export function removeLikeFromPost(userUid, postUid) {
  return {
    type: REMOVE_LIKE_FROM_POST,
    userUid,
    postUid
  };
};

export function togglePostLike(userUid, postUid, value) {
  return async (dispatch) => {
    const likeRef = database.child('likes/').child(postUid).child(userUid);

    if (value) {
      await likeRef.set(Date.now());

      return dispatch(addLikeToPost(userUid, postUid));
    }

    await likeRef.remove();

    return dispatch(removeLikeFromPost(userUid, postUid));
  };
}