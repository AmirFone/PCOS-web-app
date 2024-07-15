import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: "AIzaSyAtJDYnFusta-5YOTt_zn3Ox4JccVK3ZXg",
//   authDomain: "evehealth-93a7c.firebaseapp.com",
//   projectId: "evehealth-93a7c",
//   storageBucket: "evehealth-93a7c.appspot.com",
//   messagingSenderId: "950235266409",
//   appId: "1:950235266409:web:b08364bc5a58268bf111f8",
//   measurementId: "G-YBQZNXEK9E"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAtJDYnFusta-5YOTt_zn3Ox4JccVK3ZXg",
//   authDomain: "evehealth-93a7c.firebaseapp.com",
//   projectId: "evehealth-93a7c",
//   storageBucket: "evehealth-93a7c.appspot.com",
//   messagingSenderId: "950235266409",
//   appId: "1:950235266409:web:b08364bc5a58268bf111f8",
//   measurementId: "G-YBQZNXEK9E"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);