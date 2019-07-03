import * as Actions from '../actions';

const INITIAL_STATE = {
  email: 'teste@teste.com',
  name: 'teste',
  password: '123456'
};

export default function registrationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_REGISTRATION_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case Actions.SET_REGISTRATION_NAME:
      return {
        ...state,
        name: action.name
      };
    case Actions.SET_REGISTRATION_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    default:
      return state;
  }
};