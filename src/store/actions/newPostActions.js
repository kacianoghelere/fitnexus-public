export const UPLOADING_NEW_POST_PICTURE = 'UPLOADING_NEW_POST_PICTURE';

export function uploadingNewPostPicture() {
  return {
    type: UPLOADING_NEW_POST_PICTURE
  };
};

export const SET_NEW_POST_PICTURE_URL = 'SET_NEW_POST_PICTURE_URL';

export function setNewPostPictureUrl(pictureUrl) {
  return {
    type: SET_NEW_POST_PICTURE_URL,
    pictureUrl
  };
};

export const SET_NEW_POST_MEASUREMENT = 'SET_NEW_POST_MEASUREMENT';

export function setNewPostMeasurement(key, value) {
  return {
    type: SET_NEW_POST_MEASUREMENT,
    key,
    value
  };
}

export const RESET_NEW_POST = 'RESET_NEW_POST';

export function resetNewPost() {
  return { type: RESET_NEW_POST };
}