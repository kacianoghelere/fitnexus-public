import * as Actions from '../actions';

const INITIAL_NUMBER_VALUE = '0.00';

const INITIAL_STATE = {
  uploadingPicture: false,
  pictureUrl: '',
  bodyFat: INITIAL_NUMBER_VALUE,
  chest: INITIAL_NUMBER_VALUE,
  height: INITIAL_NUMBER_VALUE,
  hip: INITIAL_NUMBER_VALUE,
  leftBiceps: INITIAL_NUMBER_VALUE,
  leftCalf: INITIAL_NUMBER_VALUE,
  leftThigh: INITIAL_NUMBER_VALUE,
  neck: INITIAL_NUMBER_VALUE,
  rightBiceps: INITIAL_NUMBER_VALUE,
  rightCalf: INITIAL_NUMBER_VALUE,
  rightThigh: INITIAL_NUMBER_VALUE,
  waist: INITIAL_NUMBER_VALUE,
  weight: INITIAL_NUMBER_VALUE
};

export default function evolutionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_USER_CURRENT_EVOLUTION:
      const { bodyMeasurements = {} } = action;

      return {
        ...state,
        ...bodyMeasurements
      };
    case Actions.SET_CURRENT_EVOLUTION_PICTURE:
      const { pictureUrl } = action;

      return {
        ...state,
        pictureUrl,
        uploadingPicture: false
      };
    case Actions.SET_EDITING_EVOLUTION_MEASUREMENT:
      const { key, value } = action;

      return {
        ...state,
        [key]: value
      };
    default:
      return state;
  }
};