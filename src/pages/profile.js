//for buttons
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Import dependencies
import database from '../features/database.js';
import ButtonCard from '../components/button_card.js';
import BasicCard from '../components/basic_card.js';
import gpt_api from '../features/gpt-api.js';

//profile img
import bearProfile from '../assets/bear_profile.jpg';

/*

Page where the user can manage their profile: set preferences, terminate account, edit info...

*/

/*
functionality:
                Sign up:
                <button onClick={() => database.sign_up("test@gmail.com", "password")}>Sign up</button>

                Login:
                <button onClick={() => database.log_in("test@gmail.com", "password")}>Log in to an existing account</button>
                <button onClick={() => database.log_in_google()}>Sign in with google</button>

                For When User is Signed in:
                <button onClick={() => database.sign_out()}>Sign Out</button>
                <button onClick={() => database.update_user_info("banana")}>Update User Info</button>

                Checks if user signed in:
                <button onClick={() => database.get_user_info()}>Get User Info</button>
*/

function Profile() {
//page dynamically updates based on choices with state hook

const [clickButton, setclickButton] = useState({"Sign Out":false});
const [image, setImage] = useState("bearProfile");

const [databaseUpdate, setDatabaseUpdate] = useState(false);
function databaseUpdateCallback(){
    setDatabaseUpdate(!databaseUpdate);
}
database.initDatabaseUpdateCallback(databaseUpdateCallback);

//handle re-routing to meal plans page when button clicked
let navigate = useNavigate(); 
const routeChange = () =>{ 
    let path = `/meal plans`; 
    navigate(path);
}  

function handleClick(buttonName){
    if(buttonName === "My Meal Plans")
    {
        routeChange();
    }
     //passed down to each button and updates clickButton if a button is pushed which will rerender this page
    else if(buttonName === "Sign Out"){
        //try signing user out
        console.log("signing out button");
        database.sign_out();

        
        setclickButton((prevState) => ({
            ...prevState,
            [buttonName]: true
          }));
        //console.log("updated this button:", buttonName);
    }
}

const handleGenerateImage = async (user) => {
    console.log("Loading Custom Image");
    const imageURL = await gpt_api.generate_image(user.displayName); // Wait for the async function to complete
    await database.updateImage(imageURL);

    setTimeout(() => {
      user.photoURL = imageURL;
      setImage("custom");
    }, 0); 
};

  
//data passed as props for easy storage
const login = {"header":"Welcome!",
                "subheader":"You don't appear to be logged in.",
                "loginButtons":LoginButtons};

function LoginButtons(){
    
    //console.log("runnning loginButtons")
    return(
        <div className='flex space-x-4'>
            <button onClick={() => database.log_in_google()} className='mt-10 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 transform transition-transform duration-300'>Continue with Google</button>
        </div>
    );
}

function dalleButton(){
    return(
        <button className="mt-10 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 transform transition-transform duration-300" onClick={() => handleGenerateImage(userInfo)}>Generate Custom Image</button>
    );
}

//data passed as props for easy storage
const profileActions = {"header":"Actions",
                "textOn":["My Meal Plans", "Sign Out"],
                "update":handleClick};


    const userInfo = database.get_user_info()
    console.log("database.get_user_info():", userInfo);
    //console.log(userInfo.photoURL)
    if (userInfo != null) {
        // Authenticated
        console.log(`Authenticated`)
        return (
            <div className='h-screen text-center p-5 bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x'>
                <h1 className="text-5xl font-bold pb-3 text-white">Profile</h1>
                <h4 className='text-lg font-light'>On this page you can manage your profile. Checkout the Meal Plans page to customize your meal plans!</h4>
                <div className='p-16 flex flex-row items-top justify-between'>
                    {/* Card 1*/}
                    <div className='px-3 w-1/2'>
                        <BasicCard
                        header={`Account Information`}
                        bulletPts={[`Name: ${userInfo.displayName}`,`Email: ${userInfo.email}`]}
                        imgKey={`profile picture`}
                        imgSrc={userInfo.photoURL}
                        jsxComponents={dalleButton}
                        ></BasicCard>
                    </div>
                    {/* Optionally: Add a reset password option */}

                    {/* Card 3 */}
                    <div className='px-3 w-1/2'>
                        <ButtonCard
                        header={profileActions['header']}
                        textOn={profileActions['textOn']}
                        update={profileActions['update']}
                        ></ButtonCard>
                    </div>
                </div>
            </div>
        )
    } else {
        // Not authenticated
        
        return (
            <div className="flex items-center justify-center h-screen p-96 bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x">
                <ButtonCard
                header={login["header"]}
                subheader={login["subheader"]}
                loginButtons={login["loginButtons"]}
                ></ButtonCard>
            </div>
        )
    }
}

export default Profile;
