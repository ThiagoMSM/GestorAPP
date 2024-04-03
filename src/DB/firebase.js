import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAQleJdeqX27cOrGS2Uz1OW4IiZqCFzSFY",
    authDomain: "gestorapp-be6e9.firebaseapp.com",
    databaseURL: "https://gestorapp-be6e9-default-rtdb.firebaseio.com",
    projectId: "gestorapp-be6e9",
    storageBucket: "gestorapp-be6e9.appspot.com",
    messagingSenderId: "732274346143",
    appId: "1:732274346143:web:c045c9db48b4796add3aaa",
    measurementId: "G-F2SE84HBV9"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getDatabase(app);