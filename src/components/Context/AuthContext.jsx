import { useReducer } from "react";
import { createContext, useEffect } from "react"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) =>{
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            }
        case "LOGIN_SUCCESS":     
            return {
                user: action.payload,
                loading: false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "LOGOUT": 
            return {
                user: null,
                loading: false,
                error: null,
            }
        default:
            return state;
    }

}

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem('user', JSON.stringify(state.user));
    },[state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )



}
// import {useContext, createContext, useState, useEffect} from 'react';
// import {auth} from '../firebase';
// import { createUserWithEmailAndPassword,
//      signInWithEmailAndPassword, 
//      signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail } from "firebase/auth";


// const AuthContext = createContext();

// export function UserAuthContextProvider({children}){

//     const [user,setUser]=useState({});

//     function signup(email,password){
//        return  createUserWithEmailAndPassword(auth,email,password)
//     }
//     function login(email,password){
//         return signInWithEmailAndPassword(auth,email,password)
//     }
//     function logout(){
//         return signOut(auth)
//     }
//     function signInwithgoogle(){
//         const googleProvider=new GoogleAuthProvider();
//         return signInWithPopup(auth,googleProvider);
//     }
//     function resetPassword(email){
//         return sendPasswordResetEmail(auth,email);
//     }
//     //to let component know firebase if user is logged in or not we use onAuthStateChanged as we have to use it only once we use useEffect with no/empty dependency array
//     useEffect(()=>{
//         const unsubscribe=onAuthStateChanged(auth,(currentUser)=>(
//                 setUser(currentUser)
//         ))
//         return (()=>{unsubscribe();})
//     })

//     return(
//         <AuthContext.Provider value={{user,signup,login,logout,signInwithgoogle,resetPassword}}>
//             {children}
//         </AuthContext.Provider>

//     )
// }
// export function useUserAuthContext(){
//     return useContext(AuthContext);
// }