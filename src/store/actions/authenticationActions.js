import firebase from '../../config/firebase';
import { getFollowedUsersUids, getFollowersUsersUids } from '../../util/database';
import { updateUserCurrentEvolution } from './evolutionActions';
import { refreshTimeline } from './timelineActions';

export const SET_AUTHENTICATION_PENDING = 'SET_AUTHENTICATION_PENDING';

export function authenticationPending() {
  return { type: SET_AUTHENTICATION_PENDING };
};

export const SET_AUTHENTICATION_REJECTED = 'SET_AUTHENTICATION_REJECTED';

export function authenticationRejected() {
  return { type: SET_AUTHENTICATION_REJECTED };
};

export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';

export function setAuthenticatedUser(user) {
  return {
    type: SET_AUTHENTICATED_USER,
    user
  };
};

export const EVOLUTION_PENDING = 'EVOLUTION_PENDING';

const database = firebase.database().ref();

export function setUserBodyMeasurementsByUid(uid) {
  return async (dispatch) => {
    dispatch({ type: EVOLUTION_PENDING });

    const evolutionRef = database.child('evolution/').child(uid);

    const snapshot = await evolutionRef.limitToLast(1).once('value');

    if (snapshot && snapshot.val()) {
      const [timestamp, value] = Object.entries(snapshot.val())[0];

      dispatch(updateUserCurrentEvolution({
        ...value,
        timestamp
      }));
    }
  }
}

export const SET_FOLLOWER_IDS = 'SET_FOLLOWER_IDS';

export function setUserFollowersByUid(uid) {
  return async (dispatch) => {
    const followerIds = await getFollowersUsersUids(uid);

    dispatch({ type: SET_FOLLOWER_IDS, followerIds });
  }
}

export const SET_FOLLOWED_IDS = 'SET_FOLLOWED_IDS';

export function setUserFollowedsByUid(uid) {
  return async (dispatch) => {
    const followedIds = await getFollowedUsersUids(uid);

    dispatch({ type: SET_FOLLOWED_IDS, followedIds });
  }
}

export function setAuthenticatedUserByUid(uid) {
  return async (dispatch) => {
    dispatch(authenticationPending());

    const userSnapshot = await database.child('users/').child(uid).once('value');

    const user = userSnapshot.val();

    dispatch(setAuthenticatedUser({ ...user, uid }));

    dispatch(setUserBodyMeasurementsByUid(uid));

    dispatch(setUserFollowersByUid(uid));

    dispatch(setUserFollowedsByUid(uid));

    dispatch(refreshTimeline(uid));
  }
}

export function updateAuthenticatedUser({ uid, ...userData }) {
  return async (dispatch) => {
    const uid = firebase.auth().currentUser.uid;

    const userRef = database.child('users/').child(uid);

    await userRef.update(userData);

    const userSnapshot = await userRef.once('value');

    const user = userSnapshot.val();

    dispatch(setAuthenticatedUser({ ...user, uid }));
  }
}