import * as Actions from '../actions';

const INITIAL_STATE = {
  email: 'testehdhsna@teste.com',
  password: '123456'
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.SET_LOGIN_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case Actions.SET_LOGIN_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    default:
      return state;
  }
};