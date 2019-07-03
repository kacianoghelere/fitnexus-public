import { Actions, ActionConst } from 'react-native-router-flux';

import * as Database from '../../util/database';

export const FETCHING_USER = 'FETCHING_USER';

export function fetchingUser() {
  return { type: FETCHING_USER };
};

export const FETCHING_USER_EVOLUTIONS = 'FETCHING_USER_EVOLUTIONS';

export function fetchingUserEvolutions() {
  return { type: FETCHING_USER_EVOLUTIONS };
};

export const SET_SELECTED_USER = 'SET_SELECTED_USER';

export function setSelectedUser(user) {
  return {
    type: SET_SELECTED_USER,
    user
  };
};

export const RESET_SELECTED_USER = 'RESET_SELECTED_USER';

export function resetSelectedUser() {
  return { type: RESET_SELECTED_USER };
};

export const SET_SELECTED_USER_EVOLUTIONS = 'SET_SELECTED_USER_EVOLUTIONS';

export function setSelectedUserEvolutions(evolutions) {
  return {
    type: SET_SELECTED_USER_EVOLUTIONS,
    evolutions
  };
};

export const SET_USER_FOLLOWEDS = 'SET_USER_FOLLOWEDS';

export function setUserFolloweds(followeds) {
  return {
    type: SET_USER_FOLLOWEDS,
    followeds
  };
};

export const SET_USER_FOLLOWERS = 'SET_USER_FOLLOWERS';

export function setUserFollowers(followers) {
  return {
    type: SET_USER_FOLLOWERS,
    followers
  };
};

export function showUserProfile(userUid) {
  Actions.Profile({ type: ActionConst.PUSH_OR_POP });

  return async (dispatch) => {
    dispatch(resetSelectedUser());

    dispatch(fetchingUser());

    const user = await Database.getUser(userUid);

    const followeds = await Database.getFolloweds(userUid);

    dispatch(setUserFolloweds(followeds));

    const followers = await Database.getFollowers(userUid);

    dispatch(setUserFollowers(followers));

    dispatch(setSelectedUser(user));

    dispatch(fetchingUserEvolutions());

    const evolutions = await Database.getUserEvolutions(userUid);

    if (evolutions) {
      dispatch(setSelectedUserEvolutions(evolutions.reverse()));
    }
  }
}