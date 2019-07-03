import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';

import firebase from '../config/firebase';

export async function handleImagePicked(folder, pickerResult) {
  const { cancelled = false, uri } = pickerResult;

  const uid = uuid.v4();

  if (!cancelled) {
    const downloadURL = await uploadImageAsync(folder, uid, uri);

    return { uid, downloadURL };
  }

  return null;
}

export async function pickImage() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  if (status === 'granted') {
    return await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  }

  return null;
}

export async function takePhoto() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);

  if (status === 'granted') {
    return await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  }

  return null;
}

export async function uploadImageAsync(folder, uid, uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref(folder).child(uid);

  await ref.put(blob);

  const downloadURL = await ref.getDownloadURL();

  return downloadURL;
}