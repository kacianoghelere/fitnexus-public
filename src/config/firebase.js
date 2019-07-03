import firebase from 'firebase';

const config = {
  apiKey: "",
  authDomain: "<app>.firebaseapp.com",
  databaseURL: "https://<app>.firebaseio.com",
  projectId: "<app>",
  storageBucket: "<app>.appspot.com",
  messagingSenderId: ""
};

firebase.initializeApp(config);

export default firebase;
