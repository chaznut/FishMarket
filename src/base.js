import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBDaQufWw_7bDSitAfB_uvJ8NAVTDdvsnU",
  authDomain: "catch-of-the-day-james-nutter.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-james-nutter.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//this is a default export
export default base;
