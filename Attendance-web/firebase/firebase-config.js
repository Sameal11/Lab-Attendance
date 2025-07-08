// firebase-config.js
// Using Firebase compat SDK style consistently

// Firebase config object
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "G-Z9DEW9NZT6"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get auth and firestore instances
const auth = firebase.auth();
const db = firebase.firestore();

// Attach auth and db to window for global access
window.auth = auth;
window.db = db;
console.log("✅ window.db initialized (compat):", window.db);
window.dispatchEvent(new Event("dbInitialized"));
