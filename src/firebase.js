import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaZnrQ5PhghBJklq41Vurl_vfTkXZBveQ",
  authDomain: "chat-app-4ca87.firebaseapp.com",
  projectId: "chat-app-4ca87",
  storageBucket: "chat-app-4ca87.appspot.com",
  messagingSenderId: "489542354846",
  appId: "1:489542354846:web:f7aa197a15cea51656b88f"
};


export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const storage = getStorage(app); 
export const db = getFirestore(app);