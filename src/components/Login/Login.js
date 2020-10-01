import React, { useContext } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { Link, useHistory, useLocation } from "react-router-dom";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        storeAuthToken();
        history.replace(from);
        // ...
      })
      .catch(function (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const storeAuthToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
        sessionStorage.setItem('token', idToken);
      // ...
    }).catch(error => {
      console.log(error);
    });
  }
  return (
    <div>
      <h1>This is Login</h1>
      
      <Link to="/about">
            <button>Order List</button>
      </Link>

      <button onClick={handleGoogleSignIn}>Google Sign in</button>
        
     
    </div>
  );
};

export default Login;
