import { combineReducers } from 'redux';

import authenticationReducer from './authenticationReducer';
import editingEvolutionReducer from './editingEvolutionReducer';
import evolutionReducer from './evolutionReducer';
import fontLoaderReducer from './fontLoaderReducer';
import loginReducer from './loginReducer';
import newPostReducer from './newPostReducer';
import notificationsReducer from './notificationsReducer';
import pictureDisplayedReducer from './pictureDisplayedReducer';
import registrationReducer from './registrationReducer';
import searchReducer from './searchReducer';
import selectedUserReducer from './selectedUserReducer';
import selectedUserEvolutionsReducer from './selectedUserEvolutionsReducer';
import timelineReducer from './timelineReducer';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  fontLoader: fontLoaderReducer,
  currentEvolution: evolutionReducer,
  editingEvolution: editingEvolutionReducer,
  newPost: newPostReducer,
  newEvolution: evolutionReducer,
  login: loginReducer,
  notifications: notificationsReducer,
  pictureDisplayed: pictureDisplayedReducer,
  registration: registrationReducer,
  search: searchReducer,
  selectedUser: selectedUserReducer,
  selectedUserEvolutions: selectedUserEvolutionsReducer,
  timeline: timelineReducer
});

export default rootReducer;