import firebase from "firebase/compat/app";
import "firebase/auth";
import UserIcon from '../../../images/doc/user.svg';
import firebaseConfig from "../../../firebase.js";
import jwt_decode from "jwt-decode";

// Initialize Firebase
// if (firebase.apps.length === 0) {
//     firebase.initializeApp(firebaseConfig);
// }

const defaultDisplayName = (name) => {
    let firstName = name;
    let displayName = firstName.substring(0, 4)
    return displayName
}
const handleResponse = (res) => {
    const { displayName, email, photoURL } = res.user;
    const userInfo = {
        isSignedIn: true,
        name: displayName || defaultDisplayName(email),
        email: email,
        dp: photoURL || UserIcon
    }
    return userInfo;
}
export const createAccountWithEmail = (displayName, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            storeAuthToken(res);
            return handleResponse(res)
        })
        .catch(error => {
            const message = {
                error: error.message
            }
            return message
        })
}

//Provider Loggin
export const handleLoginWithProvider = (provider) => {
    return firebase.auth().signInWithPopup(provider)
        .then((res) => {
            storeAuthToken(res)
            return handleResponse(res);
        }).catch((error) => {
            const message = {
                error: error.message
            }
            return message;
        })
}

export const handleSignInWithEmailAndPass = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            storeAuthToken()
            return handleResponse(res)
        })
        .catch((error) => {
            const message = {
                error: error.message,
            }
            return message;
        });
}

//store auth in session storage
const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
            localStorage.setItem('token', idToken);
        }).catch((error) => {
            console.log(error)
        })
}

export const getDecodeUser = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        return {};
    }
    const { name, dp, email } = jwt_decode(token);
    const decodedUser = {
        isSignedIn: true,
        name: name || defaultDisplayName(email),
        email: email,
        img: dp || UserIcon
    }
    return decodedUser
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then((res) => {
            localStorage.removeItem('token');
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                dp: '',
            }
            return signedOutUser
        })
}
