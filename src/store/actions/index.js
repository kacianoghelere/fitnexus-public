export const LOADING_FONTS_PENDING = 'LOADING_FONTS_PENDING';

export function setLoadingFontsPending() {
  return { type: LOADING_FONTS_PENDING };
};

export const LOADING_FONTS_FINISHED = 'LOADING_FONTS_FINISHED';

export function setLoadingFontsFinished() {
  return { type: LOADING_FONTS_FINISHED };
};

// -----------------------------------------------------------------------------

export * from './authenticationActions';

export * from './evolutionActions';

export * from './editingEvolutionActions';

export * from './loginActions';

export * from './newPostActions';

export * from './notificationActions';

export * from './pictureDisplayedActions';

export * from './profileActions';

export * from './registrationActions';

export * from './searchActions';

export * from './selectedUserActions';

export * from './timelineActions';