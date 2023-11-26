import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyGb2ZlMTioTgm9VTOYnyl2S_e5D2m-a0",
  authDomain: "dashtoon-18ba2.firebaseapp.com",
  projectId: "dashtoon-18ba2",
  storageBucket: "dashtoon-18ba2.appspot.com",
  messagingSenderId: "456399386481",
  appId: "1:456399386481:web:a0737cbc82d6d2274b28d0",
  measurementId: "G-ND84ZZLWR3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()