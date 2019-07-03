import { Actions, ActionConst } from 'react-native-router-flux';

import firebase from '../../config/firebase';
import { getPostEvolution } from '../../util/database';

const database = firebase.database().ref();

export const RESET_DISPLAYED_PICTURE = 'RESET_DISPLAYED_PICTURE';

export function resetDisplayedPicture() {
  return { type: RESET_DISPLAYED_PICTURE };
};

export const SET_DISPLAYED_PICTURE = 'SET_DISPLAYED_PICTURE';

export function setDisplayedPicture(picture) {
  return {
    type: SET_DISPLAYED_PICTURE,
    picture
  };
};

export function displayPicture(picture) {
  return async (dispatch) => {
    dispatch(resetDisplayedPicture());

    Actions.PictureDisplay({ type: ActionConst.PUSH });

    if (!picture.likees) {
      const likees = await getPostEvolution(picture.uid);

      return dispatch(setDisplayedPicture({
        ...picture,
        likees
      }));
    }

    return dispatch(setDisplayedPicture(picture));
  };
};