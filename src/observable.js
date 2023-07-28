import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useState, useEffect } from "react";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDyQnEvU7qC03-kEHDp_6alJV7zl5zDGRE",
  authDomain: "mofer-fa621.firebaseapp.com",
  databaseURL:
    "https://mofer-fa621-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mofer-fa621",
  storageBucket: "mofer-fa621.appspot.com",
  messagingSenderId: "182289102972",
  appId: "1:182289102972:web:74be8b231e17b378c871f9",
  measurementId: "G-9WPJFFYZW4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//      const uid = user.uid;
//     if (typeof console !== 'undefined' && typeof console.log === 'function') {
//       console.log(uid);
//     } else {
//       // Handle the case when console.log is not available
//       // For example, you can use alert() to display the message
//       console.log(uid);
//       // setSign(1);
//     }
//     // console.log(uid)
//     // ...
//   } else {
//     // User is signed out
//     // setSign(0);
//     console.log('logged out')
//     // ...
//   }
// });
// export default auth;

function useAuthState() {
  const [isSignedIn, setIsSignedIn] = useState(null);
  const [is_disabled, setIs_disabled] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        axios
          .get(`http://192.168.43.14:5000/api/web/check?uid=${user.uid}`)
          .then((response) => {
            // console.log();
            console.log(response.data.data.is_disabled);
            if (response.data.data.is_disabled == 1) {
              console.log("user logged in but the account is disabled");
              return setIsSignedIn(2);
            } else {
              console.log("user logged in and hi/hers account is active");
              return setIsSignedIn(1);
            }
          })
          .catch((response) => {
            console.log(response.data);
            return setIsSignedIn(1);
          });
      } else {
        console.log("user is not logged in and hi/hers account is disabled");
        return setIsSignedIn(0);
      }
    });

    return () => unsubscribe();
  }, []);

  return isSignedIn;
}

export default { useAuthState, auth };
