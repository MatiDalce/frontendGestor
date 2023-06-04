//FROM: https://github.com/firebase/firebaseui-web-react#using-styledfirebaseauth-with-a-redirect
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../firebase.js";

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen() {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
}

export default SignInScreen 
