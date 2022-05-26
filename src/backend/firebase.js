import { initializeApp } from "firebase/app";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { useState } from "react";

import {
    getFirestore,
    collection,
    doc,
    query,
    where,
    addDoc,
    setDoc,
    getDocs,
    Timestamp,
    deleteDoc,
    getDoc,
} from 'firebase/firestore';

import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';


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

/* First, checks if the username is already being used.
*  Then, checks if the email is already being used.
*  If they are not, adds the authentication and the user.
*/
export async function onSignUp(data) {
    let isValid = await getDataFromWhere("users", "username", data.username) == null;
    if (!isValid) {
        console.log("Username is being used")
        return "SIGN_UP_USERNAME";
    }
    isValid = await getDataFromWhere("users", "email", data.email) == null;
    if (!isValid) {
        console.log("Email is being used")
        return "SIGN_UP_EMAIL";
    }

    await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async () => {
            await addUser(data);
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

    });
}

//  *****************************
//   DATABASE PART
//  *****************************
const db = getFirestore(app);

// Users
export async function addUser(data) {
    await addDoc(collection(db, "users"), {
        username: data.username,
        email: data.email,
        name: data.name,
        biography: '',
        profilePictureURI: '',
        dateCreated: Timestamp.now(),
        dateUpdated: Timestamp.now()
    });
}

export async function setProfilePicture(data) {
    const metadata = {
        contentType: 'image/jpeg'
    };

    const resp = await fetch(data.imageURI);
    const blob = await resp.blob();

    const randomAddress = "profile";
    const path = 'images/' + data.username + '/' + randomAddress + '.jpg';

    const storageRef = ref(storage, path);

    let userId = await getIdFromWhere("users", "username", data.username)
    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
        getDownloadURL(storageRef)
            .then((url) => {
                setDoc(doc(db, "users", userId), {
                    profilePictureURI: url,
                    dateUpdated: Timestamp.now()
                }, {
                    merge: true,
                });
            });
        console.log('Updated profile picture');
    });
}

export async function setBiography(data) {
    let userId = await getIdFromWhere("users", "username", data.username)
    await setDoc(doc(db, "users", userId), {
        biography: data.biography,
        dateUpdated: Timestamp.now()
    }, {
        merge: true,
    });
}

export async function getUserDataByUsername(username) {
    return getDataFromWhere("users", "username", username);
}

export async function getUserDataByEmail(email) {
    return getDataFromWhere("users", "email", email);
}

// Albums
export async function createAlbum(data) {
    const isValid = await getDataFromWhere("albums", "albumId", data.albumId) == null;
    console.log(isValid);

    if (!isValid) {
        console.log("AlbumId is being used")
        return false;
    }

    await addAlbum(data);
    await addOwner(data);
    await addContributor(data);
    await addFollower(data);
    return true;
}

export async function followAlbum(data) {
    addFollower(data);
}

export async function contributeAlbum(data) {
    addContributor(data);
}
export async function makeAlbumPrivate(data) {
    makePrivate(data)
}

export async function unfollow(data) {
    const q = query(collection(db, "followers"), where("username", "==", data.username));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
        if (document.data().albumId == data.albumId) {
            await deleteDoc(doc(db, "followers", document.id));
        }
    });
}

export async function uncontribute(data) {
    const q = query(collection(db, "contributors"), where("username", "==", data.username));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
        if (document.data().albumId == data.albumId) {
            await deleteDoc(doc(db, "contributors", document.id));
        }
    });
}

export async function addAlbum(data) {
    await addData("albums", {
        albumName: data.albumName,
        albumId: data.albumId,
        albumCoverURI: '',
        dateCreated: Timestamp.now(),
        dateUpdated: Timestamp.now()
    });
}

export async function addOwner(data) {
    addData("owners", {
        albumId: data.albumId,
        username: data.username,
        dateCreated: Timestamp.now()
    });
}

export async function addContributor(data) {
    addData("contributors", {
        albumId: data.albumId,
        username: data.username,
        dateCreated: Timestamp.now()
    });
}

export async function addFollower(data) {
    addData("followers", {
        albumId: data.albumId,
        username: data.username,
        dateCreated: Timestamp.now()
    });
}
export async function makePrivate(data) {
    
}
// Username: String -> Album List: []
export async function getOwnedAlbums(username) {
    return getAllDataFromWhere("owners", "username", username);
}

// Username: String -> Album List: []
export async function getContributedAlbums(username) {
    return getAllDataFromWhere("contributors", "username", username);
}

// Username: String -> Album List: []
export async function getFollowedAlbums(username) {
    return getAllDataFromWhere("followers", "username", username);
}

// Album ID: String -> Album Data: {}
export async function getAlbumData(albumId) {
    return getDataFromWhere("albums", "albumId", albumId);
}

// Search
export async function searchUsers(str) {
    const to = str.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

    const q = query(collection(db, "users"), where("username", ">=", str), where("username", "<", to));

    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
}

export async function searchAlbums(str) {
    const to = str.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

    const q = query(collection(db, "albums"), where("albumId", ">=", str), where("albumId", "<", to));

    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
}


//  *****************************
//   General Functions
//  *****************************

// General Function to add data to a given collection
export async function addData(collection_name, data) {
    await addDoc(collection(db, collection_name), data);
}

// General Function to get single data from given collection where given field equals to given value
export async function getDataFromWhere(collection_name, field_name, field_value) {
    const q = query(collection(db, collection_name), where(field_name, "==", field_value));

    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data[0];
}

// General Function to get single data from given collection where given field equals to given value
export async function getAllDataFromWhere(collection_name, field_name, field_value) {
    const q = query(collection(db, collection_name), where(field_name, "==", field_value));

    const querySnapshot = await getDocs(q);

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
}

export async function getIdFromWhere(collection_name, field_name, field_value) {
    const q = query(collection(db, collection_name), where(field_name, "==", field_value));

    const querySnapshot = await getDocs(q);

    let userId = '';
    querySnapshot.forEach((doc) => {
        userId = doc.id;
    });

    return userId;
}

// POST IMAGE
const storage = getStorage();

export async function postImage(data) {
    const metadata = {
        contentType: 'image/jpeg'
    };

    const resp = await fetch(data.imageURI);
    const blob = await resp.blob();

    const randomAddress = Math.floor(1000000000000000 + Math.random() * 9000000000000000);
    const path = 'images/' + data.username + '/' + randomAddress + '.jpg';

    const storageRef = ref(storage, path);

    uploadBytes(storageRef, blob, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file');
        getDownloadURL(storageRef)
            .then(async (url) => {
                const postData = {
                    postId: data.username + "/" + randomAddress,
                    albumId: data.albumId,
                    username: data.username,
                    caption: data.caption,
                    imageURI: url
                }
                console.log(postData)
                addPost(postData);

                let albumId = await getIdFromWhere("albums", "albumId", data.albumId)
                setDoc(doc(db, "albums", albumId), {
                    albumCoverURI: url,
                }, {
                    merge: true,
                });
                console.log("Album Cover set.")
            });
    });
}

export async function addPost(data) {
    const docRef = doc(collection(db, "posts"));

    await setDoc(docRef, {
        postId: docRef.id,
        albumId: data.albumId,
        username: data.username,
        caption: data.caption,
        imageURI: data.imageURI,
        likeCount: 0,
        dateCreated: Timestamp.now(),
        dateUpdated: Timestamp.now()
    });
}

export async function getPosts(albumId) {
    return getAllDataFromWhere("posts", "albumId", albumId);
}


// Like Comment 
export async function isLiked(username, postId) {
    let userLikes = await getAllDataFromWhere("likes", "username", username);
    console.log(userLikes.map((like) => like.postId));
    return userLikes.map((like) => like.postId).includes(postId);
}

export async function addLike(data) {
    await addData("likes", {
        username: data.username,
        postId: data.postId,
        dateCreated: Timestamp.now()
    });

    const docRef = doc(db, "posts", data.postId);
    const docSnap = await getDoc(docRef);

    await setDoc(docRef, {
        likeCount: docSnap.data().likeCount + 1,
    }, {
        merge: true
    });
}

export async function removeLike(username, postId) {
    const q = query(collection(db, "likes"), where("username", "==", username));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
        if (document.data().postId == postId) {
            await deleteDoc(doc(db, "likes", document.id));

            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);

            await setDoc(docRef, {
                likeCount: docSnap.data().likeCount - 1,
            }, {
                merge: true
            });
        }
    });
}


export async function addComment(data) {
    await addData("comments", {
        postId: data.postId,
        username: data.username,
        comment: data.comment,
        dateCreated: Timestamp.now(),
        dateUpdated: Timestamp.now(),
    });
}