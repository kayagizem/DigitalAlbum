import { initializeApp } from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    getFirestore,
    collection,
    query,
    where,
    addDoc,
    getDocs,
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCZ6yPEg-R2LZW_j2xPe8_KZtCzurXa-qk",
    authDomain: "finalprojectdigitalalbum.firebaseapp.com",
    projectId: "finalprojectdigitalalbum",
    storageBucket: "finalprojectdigitalalbum.appspot.com",
    messagingSenderId: "962465027904",
    appId: "1:962465027904:web:095b1ed30a99c6337acca5",
    measurementId: "G-WF0BEZ4MD7"
};

const app = initializeApp(firebaseConfig);

// Authentication Part
const auth = getAuth();

export function signUpFirebase(data) {
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

const db = getFirestore(app);

//  *****************************
//   DATABASE PART
//  *****************************

/*
Do not delete until you are comfortable with firebase.

export async function getUserDataByUsername(username) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        console.log("No such document");
    }

    const docSnapData = docSnap.data();
    return docSnapData;
}
*/

// Users

// POST USER
export async function addUser(data) {
    await addDoc(collection(db, "users"), {
        username: data.username,
        email: data.email,
        name: data.name
    });
}

// GET USER
export async function getUserDataByUsername(username) {
    return getDataFromWhere("users", "username", username);
}

export async function getUserDataByEmail(email) {
    return getDataFromWhere("users", "email", email);
}

// Albums

// POST ALBUM
export async function createAlbum(data) {
    const isValid = await getDataFromWhere("albums", "albumId", data.albumId) == null;
    console.log(isValid);

    if (!isValid) {
        return false;
    }

    await addAlbum(data);
    await addOwnership(data);
    return true;
}

export async function addAlbum(data) {
    await addData("albums", {
        albumName: data.albumName,
        albumId: data.albumId
    });
}

export async function addOwnership(data) {
    addData("ownerships", {
        albumId: data.albumId,
        owner: data.username
    });
}

export async function getAlbums(username) {
    return getAllDataFromWhere("ownerships", "owner", username);
}

export async function getAlbumData(albumId) {
    return getDataFromWhere("albums", "albumId", albumId);
}

// Image


//  *****************************
//   General Functions
//  *****************************

// General Function to add data to a given collection
export async function addData(collection_name, data) {
    await addDoc(collection(db, collection_name), data);
}

// General Function to get single data from given collection where given field equals to given value
export async function getDataFromWhere(collection_name, field_name, field_value) {
    const q = query(collection(db, collection_name), where(field_name, "==", field_value))

    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data[0];
}

// General Function to get single data from given collection where given field equals to given value
export async function getAllDataFromWhere(collection_name, field_name, field_value) {
    const q = query(collection(db, collection_name), where(field_name, "==", field_value))

    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
}