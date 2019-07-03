import * as Actions from '../actions';

const INITIAL_NUMBER_VALUE = '0.00';

const INITIAL_STATE = {
  uploading: false,
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

export default function newPostReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_USER_CURRENT_EVOLUTION:
      if (action.bodyMeasurements) {
        const { pictureUrl, ...measurements } = action.bodyMeasurements;

        return {
          ...state,
          ...measurements,
          pictureUrl: ''
        };
      }
    case Actions.UPLOADING_NEW_POST_PICTURE:
      return {
        ...state,
        uploading: true
      };
    case Actions.SET_NEW_POST_PICTURE_URL:
      const { pictureUrl } = action;

      return {
        ...state,
        pictureUrl,
        uploading: false
      };
    case Actions.SET_NEW_POST_MEASUREMENT:
      const { key, value } = action;

      return { ...state, [key]: value };
    case Actions.RESET_NEW_POST:
      return INITIAL_STATE;
    default:
      return state;
  }
};