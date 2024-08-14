import React, { useState } from 'react';
import {  FaGoogle } from 'react-icons/fa';
import { handleLoginWithProvider } from './LoginManager';
import toast from 'react-hot-toast';
import {GoogleAuthProvider} from 'firebase/auth'

// import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

// // Build Firebase credential with the Google ID token.
// const credential = GoogleAuthProvider.credential(id_token);

// // Sign in with credential from the Google user.
// const auth = getAuth();
// signInWithCredential(auth, credential).catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.customData.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });
const SocialSignUp = ({ handleResponse }) => {

    const [error, setError] = useState({})

    const handleGoogleSignIn = () => {

        let provider = new GoogleAuthProvider();
        handleLoginWithProvider(provider)
            .then(res => {
                if (res.error) {
                    setError(res.error)
                }
                handleResponse(res)
                toast("Successfully logged in")
            })
    }


    return (
        <div>
            <div className="social-media">
                <div className="social-icon" onClick={handleGoogleSignIn}>
                    <FaGoogle />
                </div>
                {/* <div className="social-icon">
                    <FaFacebook />
                </div>
                <div className="social-icon">
                    <FaGithub />
                </div> */}
            </div>
            {error.length && <h6 className="text-danger text-center p-2">{error}</h6>}

        </div>
    );
};

export default SocialSignUp;