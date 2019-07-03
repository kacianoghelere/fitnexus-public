import * as Actions from '../actions';
import evolutionReducer from './evolutionReducer';

it('sets upload status correctly', () => {
  const oldState = { uploadingPicture: false };

  const newState = evolutionReducer(oldState, {
    type: Actions.EVOLUTION_PICTURE_UPLOAD_PENDING
  });

  expect(newState.uploadingPicture).toBeTruthy();
});

it('sets measurements correctly', () => {
  const oldState = {
    bodyFat: '20.00',
    chest: '20.00',
    height: '20.00',
    waist: '20.00',
    weight: '20.00'
  };

  const action = {
    type: Actions.SET_USER_CURRENT_EVOLUTION,
    bodyMeasurements: {
      bodyFat: '30.00',
      chest: '32.00',
      height: '12.54',
      waist: '15.22',
      weight: '11.00'
    }
  };

  const newState = evolutionReducer(oldState, action);

  const { bodyMeasurements } = action;

  expect(newState.bodyFat).toBe(bodyMeasurements.bodyFat);
  expect(newState.chest).toBe(bodyMeasurements.chest);
  expect(newState.height).toBe(bodyMeasurements.height);
  expect(newState.waist).toBe(bodyMeasurements.waist);
  expect(newState.weight).toBe(bodyMeasurements.weight);
});

it('sets current picture correctly', () => {
  const oldState = {
    uploadingPicture: true,
    pictureUrl: ''
  };;

  const action = {
    type: Actions.SET_CURRENT_EVOLUTION_PICTURE,
    pictureUrl: 'https://bit.ly/2JxY8tN'
  };

  const newState = evolutionReducer(oldState, action);

  expect(newState.pictureUrl).toBe(action.pictureUrl);
  expect(newState.uploadingPicture).toBeFalsy();
});