// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { getRedirectResult } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import { getFirestore, doc, collection, addDoc, getDoc, getDocs, deleteDoc} from "firebase/firestore";
import Profile from "../pages/profile";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "smartplate-f3780.firebaseapp.com",
  projectId: "smartplate-f3780",
  storageBucket: "smartplate-f3780.appspot.com",
  messagingSenderId: "866298016441",
  appId: "1:866298016441:web:0913ac93e13382ee1ee168",
  measurementId: "G-NMHZF2LFFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

// Init google
const provider = new GoogleAuthProvider();
//provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// Maybe use this to call the refresh for the profile page

let databaseUpdateCallback = null;
function initDatabaseUpdateCallback(callback){
    databaseUpdateCallback = callback;
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in auth changed: " + user.email + " " + user.displayName);
        if(databaseUpdateCallback != null)
            databaseUpdateCallback();
    } else {
        console.log("User is signed out");
        if(databaseUpdateCallback != null)
            databaseUpdateCallback();
    }
  });

function get_user_info()
{
    console.log("Getting user info");
    let user = auth.currentUser;
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User is signed in: " + user.email + " " + user.displayName);
        const uid = user.uid;
        return user;
        // ...
    }

    // User is signed out
    // ...
    console.log("User is signed out");
    return null;
}

function update_user_info(newDisplayName)
{
    console.log("Updating user info: " + newDisplayName);
    updateProfile(auth.currentUser, {
        displayName: newDisplayName
      }).then(() => {

      }).catch((error) => {

      });
}
 
function sign_out(dispatch){
    console.log("Signing out");
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Signed out");
        dispatch({type: "login", payload: null});
    }).catch((error) => {
        // An error happened.
        console.log("Error signing out: " + error);
    });
}

function sign_up(email, password, dispatch)
{
    console.log("Signing up: " + email + " " + password);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed up: " + user);
        dispatch({type: "login", payload: user.displayName});
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
            console.log("Email already in use, logging in...");
        }else{
            console.log("Error: " + errorCode + " " + errorMessage);
        }
        // ..
    });
    return null;
}

function log_in(email, password, dispatch)
{
    console.log("Logging in: " + email + " " + password);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        console.log("Logged in: " + userCredential.user.email);
        const user = userCredential.user;
        dispatch({type: "login", payload: user.displayName});
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: " + errorCode + " " + errorMessage);
    });
}

function log_in_google(dispatch)
{
    console.log("Logging in with google");
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("Signed in via Google: " + user.email);
        dispatch({type: "login", payload: user.displayName});
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // IdP data available using getAdditionalUserInfo(result)
        // Handle Errors here.
        //const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("Error signing in via Google: " + errorMessage);
        // ...
    });
}

function sign_in_anonymous(dispatch)
{
    signInAnonymously(auth).then(() => {
        // Signed in..
        console.log("Signed in anonymously");
        dispatch({type: "login", payload: auth.currentUser.displayName});
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.log("Error signing in anonymously: " + errorCode + " " + errorMessage);
    });
}

function delete_user(dispatch)
{
    deleteUser(auth.currentUser).then(() => {
        // User deleted.
        console.log("User deleted");
        dispatch({type: "login", payload: null});
    }).catch((error) => {
        // An error ocurred
        // ...
        console.log("Error deleting user: " + error);
    });
}

function update_password(newPassword, dispatch)
{
    updatePassword(auth.currentUser, newPassword).then(() => {
        // Update successful.
        console.log("Password updated");
        dispatch({type: "login", payload: auth.currentUser.displayName});
    }).catch((error) => {
        // An error ocurred
        // ...
        console.log("Error updating password: " + error);
    });
}


//ADDED FIRESTORE DATABASE

async function add_meal_plan(plan, user) {

    // Add a new document with a generated id.
    const mealPlanRef = collection(db, 'users', user, 'meal_plans');
    const res = await addDoc(mealPlanRef, plan);
  
    console.log('Added meal plan with ID: ', res.id);

    return res.id;
}

async function get_meal_plan(id, user) {

    // Get a new document using the id.
    const mealPlanRef = doc(db, 'users', user, 'meal_plans', id);
    const meal_plan = await getDoc(mealPlanRef);
  
    if (meal_plan.exists()) {
        console.log('Got meal plan with ID: ', meal_plan.id);
        console.log('Meal plan information ', meal_plan.data());
        return meal_plan.data();
    } else {
        console.log('No such document!');
    }
}

async function get_meal_id(number, user) {
// Reference the meal_plans collection under the user's document
  const mealPlansRef = collection(db, 'users', user, 'meal_plans');

  // Get the first document in the meal_plans collection
  const querySnapshot = await getDocs(mealPlansRef);
  if (!querySnapshot.empty) {
    const nthDocument = querySnapshot.docs[number];
    const nthMealPlanIndex = nthDocument.id;
    console.log('Meal plan index:', nthMealPlanIndex);
    return nthMealPlanIndex;
  } else {
    console.log('No meal plans found for the user.');
    return null;
  }
}

async function generate_meal_number(user) {
    // Reference the meal_plans collection under the user's document
    const mealPlansRef = collection(db, 'users', user, 'meal_plans');
  
    // Get all the documents in the meal_plans collection
    const querySnapshot = await getDocs(mealPlansRef);
  
    const mealPlanCount = querySnapshot.size; // Get the number of documents
  
    console.log('Meal plan count:', mealPlanCount);
    return mealPlanCount;
}


async function updateImage(URL) {
    // Update the user's profile photo URL in Firebase Authentication
    await updateProfile(auth.currentUser, {
      photoURL: URL,
    });
}

async function delete_meal_plan(id) {
    
    // Get a new document using the id.
    const mealPlanRef = doc(db, 'meal_plans', id);
    const meal_plan = await deleteDoc(mealPlanRef);

    if (meal_plan.exists()) {
        console.log('Deleted meal plan with ID: ', meal_plan.id);
        return meal_plan.data();
    } else {
        console.log('No such document!');
    }
}


export default {get_user_info, update_user_info, sign_up, log_in, sign_out, log_in_google, add_meal_plan, get_meal_plan, get_meal_id, generate_meal_number, initDatabaseUpdateCallback, updateImage};
