// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyAo8j9pZQGbV_InQ3mNknDmCMy07v2vhQI",
	authDomain: "online-game-night-9cc21.firebaseapp.com",
	databaseURL: "https://online-game-night-9cc21.firebaseio.com",
	projectId: "online-game-night-9cc21",
	storageBucket: "online-game-night-9cc21.appspot.com",
	messagingSenderId: "1049605430277",
	appId: "1:1049605430277:web:30e29fbb3555ef74a6d06c",
	measurementId: "G-1V6NS1TNR2"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const functions = firebase.functions();



