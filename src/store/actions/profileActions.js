import firebase from '../../config/firebase';
import { showUserProfile } from './selectedUserActions';

const database = firebase.database().ref();

export const FOLLOW_USER = 'FOLLOW_USER';

export function followUser(userUid, follower) {
  return {
    type: FOLLOW_USER,
    userUid,
    follower
  };
};

export const UNFOLLOW_USER = 'UNFOLLOW_USER';

export function unfollowUser(userUid, follower) {
  return {
    type: UNFOLLOW_USER,
    userUid,
    follower
  };
};

export function toggleFollow(userUid, follow) {
  return async (dispatch, getState) => {
    const { authentication: { user: authUser } } = getState();

    const followingRef = database.child('following/').child(authUser.uid).child(userUid);

    const followersRef = database.child('followers/').child(userUid).child(authUser.uid);

    if (follow) {
      const timestamp = Date.now();

      await followingRef.set(timestamp);

      await followersRef.set(timestamp);

      dispatch(followUser(userUid, authUser));
    } else {
      await followingRef.remove();

      await followersRef.remove();

      dispatch(unfollowUser(userUid, authUser));
    }

    dispatch(showUserProfile(userUid));
  };
}