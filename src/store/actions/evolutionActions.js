import firebase from '../../config/firebase';
import { translateFirebaseError, showErrors } from '../../util';

const database = firebase.database().ref();

export function addUserEvolution({ uid }, evolutionData) {
  return async (dispatch) => {
    try {
      const timestamp = Date.now();

      const evolution = {
        [timestamp]: evolutionData
      };

      const evolutionRef = database.child('evolution/');

      const userRef = evolutionRef.child(uid);

      await userRef.update(evolution);

      dispatch(updateUserCurrentEvolution(evolutionData));
    } catch (error) {
      showErrors(translateFirebaseError(error));
    }
  }
}

export function updateUserEvolution({ uid }, { timestamp, ...evolutionData }) {
  return async (dispatch) => {
    try {
      const evolutionsRef = database.child('evolution/');

      const userRef = evolutionsRef.child(uid);

      const userEvolutionRef = userRef.child(timestamp);

      await userEvolutionRef.set(evolutionData);

      dispatch(updateUserCurrentEvolution(evolutionData));
    } catch (error) {
      showErrors(translateFirebaseError(error));
    }
  }
}

export const SET_USER_CURRENT_EVOLUTION = 'SET_USER_CURRENT_EVOLUTION';

export function updateUserCurrentEvolution(bodyMeasurements) {
  return {
    type: SET_USER_CURRENT_EVOLUTION,
    bodyMeasurements
  };
};

export const SET_CURRENT_EVOLUTION_PICTURE = 'SET_CURRENT_EVOLUTION_PICTURE';

export function setCurrentEvolutionPicture(pictureUrl) {
  return {
    type: SET_CURRENT_EVOLUTION_PICTURE,
    pictureUrl
  };
};

export const EVOLUTION_PICTURE_UPLOAD_PENDING = 'EVOLUTION_PICTURE_UPLOAD_PENDING';

export function setEvolutionPictureUploadPending() {
  return {
    type: EVOLUTION_PICTURE_UPLOAD_PENDING
  };
};

export const SET_EVOLUTION_MEASUREMENT = 'SET_EVOLUTION_MEASUREMENT';

export function setEvolutionMeasurement(key, value) {
  return {
    type: SET_EVOLUTION_MEASUREMENT,
    key,
    value
  };
}