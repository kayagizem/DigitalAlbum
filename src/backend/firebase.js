import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCZ6yPEg-R2LZW_j2xPe8_KZtCzurXa-qk",
    authDomain: "finalprojectdigitalalbum.firebaseapp.com",
    projectId: "finalprojectdigitalalbum",
    storageBucket: "finalprojectdigitalalbum.appspot.com",
    messagingSenderId: "962465027904",
    appId: "1:962465027904:web:095b1ed30a99c6337acca5",
    measurementId: "G-WF0BEZ4MD7"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export function onSignUp(data) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = errorCode;
            const errorMessage = error.message;
        });
}

export function onSignIn(data) {
    signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function onSignOut() {
    signOut(auth).then(() => {

    }).catch((error) => {

    })
}