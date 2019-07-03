import firebase from '../../config/firebase';

const database = firebase.database().ref();

export const SET_FETCHING_NOTIFICATIONS = 'SET_FETCHING_NOTIFICATIONS';

export const SET_NOTIFICATIONS_LOADED = 'SET_NOTIFICATIONS_LOADED';

export const RESET_NOTIFICATIONS = 'RESET_NOTIFICATIONS';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export function addNotification(notification) {
  return {
    type: ADD_NOTIFICATION,
    notification
  };
};

export function refreshNotifications(authUserUid) {
  return async (dispatch) => {
    dispatch({ type: RESET_NOTIFICATIONS });

    dispatch({ type: SET_FETCHING_NOTIFICATIONS });

    const evolutionsRef = database.child('evolution/').child(authUserUid);

    const evolutionsSnapshot = await evolutionsRef.orderByKey().once('value');

    const evolutions = evolutionsSnapshot.val();

    const evolutionEntries = evolutions ? Object.entries(evolutions) : [];

    await evolutionEntries.forEach(async ([evolutionUid, evolution]) => {
      const likesRef = database.child('likes/').child(evolutionUid);

      const likesSnapshot = await likesRef.orderByValue().once('value');

      const likes = likesSnapshot.val();

      const likeEntries = likes ? Object.entries(likes) : [];

      await likeEntries.forEach(async ([userUid, timestamp]) => {
        const userRef = database.child('users/').child(userUid);

        const userSnapshot = await userRef.once('value');

        const user = userSnapshot.val();

        if (user) {
          dispatch(addNotification({
            uid: timestamp,
            userUid,
            userName: user.name,
            userAvatar: user.avatar,
            timestamp,
            pictureUrl: evolution.pictureUrl
          }));
        }
      });
    });

    dispatch({ type: SET_NOTIFICATIONS_LOADED });
  }
}