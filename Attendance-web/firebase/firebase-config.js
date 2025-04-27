// firebase-config.js
// Using Firebase compat SDK style consistently

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAmO5uYhlv4SebEV3zAV_QeUQ5cuh0fQhE",
  authDomain: "studaa-1d2d1.firebaseapp.com",
  databaseURL: "https://studaa-1d2d1-default-rtdb.firebaseio.com",
  projectId: "studaa-1d2d1",
  storageBucket: "studaa-1d2d1.firebasestorage.app",
  messagingSenderId: "158278697705",
  appId: "1:158278697705:web:dff36a193ad5b39af36678",
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