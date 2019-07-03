export const SET_LOGIN_EMAIL = 'SET_LOGIN_EMAIL';

export function setLoginEmail(email) {
  return {
    type: SET_LOGIN_EMAIL,
    email
  };
};

export const SET_LOGIN_PASSWORD = 'SET_LOGIN_PASSWORD';

export function setLoginPassword(password) {
  return {
    type: SET_LOGIN_PASSWORD,
    password
  };
};