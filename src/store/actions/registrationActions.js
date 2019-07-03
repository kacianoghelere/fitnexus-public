export const SET_REGISTRATION_EMAIL = 'SET_REGISTRATION_EMAIL';

export function setRegistrationEmail(email) {
  return {
    type: SET_REGISTRATION_EMAIL,
    email
  };
};

export const SET_REGISTRATION_NAME = 'SET_REGISTRATION_NAME';

export function setRegistrationName(name) {
  return {
    type: SET_REGISTRATION_NAME,
    name
  };
};

export const SET_REGISTRATION_PASSWORD = 'SET_REGISTRATION_PASSWORD';

export function setRegistrationPassword(password) {
  return {
    type: SET_REGISTRATION_PASSWORD,
    password
  };
};