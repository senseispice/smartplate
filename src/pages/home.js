import generate_meal_plan from "../features/gpt-api"

/*

Page that will be displayed at / and /home. 
Should probably have different content depending on if the user is signed in or not. 
More of a landing page if not and if authenticated, maybe an interface to see their meal plan or create a new one

*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Element, animateScroll as scroll } from 'react-scroll';

import MealPlan from "../components/meal_plan";
import BasicCard from '../components/basic_card.js';

//images
import food1 from "./../assets/food1.jpg";
import logo from "../assets/logo.jpg";

//css
import '../index.css';

function Home() {
    
    //OnClick change to Profile page (login/get started)
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/profile`; 
        navigate(path);
    }  

    //Fading LEARN MORE on Scroll
    const [showDiv, setShowDiv] = useState(true);

    const handleScroll = () => {
    const scrollPosition = window.pageYOffset;

    //number of pixels when to fade
    if (scrollPosition > 75) {
        setShowDiv(false);
    } else {
        setShowDiv(true);
    }
    };

    useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    // Info after scroll
    const photoCard = {"header":"Ever find yourself running out of energy mid-day?",
    "imgKey":"food1",
    "imgSrc":food1, 
    "regularTxt":"Or perhaps you're working towards a personal goal such as completing a sporting event, gaining muscle mass or improving your overall health? In any case, being conscious of the way you fuel your body is a key factor when it comes to achieving your goal."   }

    const choosingSP = {"header": "Why choose Smartplate?",
    "bulletPts":["Customized Meal Plans: Say goodbye to generic meal suggestions. Smartplate understands that everyone has unique dietary needs and preferences. Our advanced algorithm creates personalized meal plans tailored specifically for you.",
    "Nutritionally Balanced: Achieve optimal health and well-being. Smartplate ensures that your meals are nutritionally balanced, providing you with the energy and nutrients needed to stay focused and perform at your best academically and physically.",
    "Variety and Taste: No more boring meals! Smartplate offers a diverse range of delicious recipes to keep your taste buds excited. Whether you're a vegetarian, vegan, or have specific dietary requirements, we have you covered with a wide selection of options.",
    "Easy and Convenient: We understand the demands of college life. Smartplate simplifies your meal planning by providing easy-to-follow recipes, complete with step-by-step instructions and ingredient lists. Spend less time stressing about meals and more time doing what you love."]}

    const howWorks = {"header":"How it works",
    "bulletPts":["Tell Us About Yourself: Start by sharing your dietary preferences, any food allergies or restrictions, and your goals. Smartplate takes this information into account to create your personalized meal plan.",
    "Receive Your Meal Plan: Sit back and relax as Smartplate's intelligent algorithm generates a customized meal plan just for you. It factors in your preferences, nutritional requirements, and even considers your schedule to ensure a seamless experience.",
    "Delicious Recipes and Grocery Lists: Access a wide variety of mouthwatering recipes tailored to your meal plan. Each recipe comes with a detailed list of ingredients and quantities needed, making grocery shopping a breeze.",
    "Enjoy Your Meals: Get ready to savor healthy and delectable meals! Follow the easy-to-understand cooking instructions and discover a world of flavors right at your fingertips."],
    }
    
    return (
        <main className="columns-1 items-center bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x">
            <div className="text-center justify-center h-screen">
                <div className="flex justify-center mt-32 mb-16">
                    <img className="w-48 h-auto" src={logo} alt="logo"></img>
                </div>
                <h3 className="text-4xl text-black mb-5">
                    Meal Plans for <span className="text-white italic">Healthier Students</span> and <span className="text-white italic">Happier Wallets</span>
                </h3>
                <button onClick={routeChange} type="button" className="animate-pulse mt-10 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 transform transition-transform duration-300 hover:scale-100 hover:animate-none">Just a Click Away</button>
                <Element name="myElement" className="inset-x-0 absolute bottom-5 text-gray-50 text-sm transition-opacity duration-1000" style={{ opacity: showDiv ? 1 : 0 }}>
                {   
                <div>
                    <p >Learn More</p>
                    <p className="animate-bounce">&darr;</p>
                </div>
                }
                </Element>
            </div>
            <section className="items-center"> 
                <h1 className="text-4xl font-bold text-center">
                <span className="text-white text-5xl">SmartPlate:</span> Leveraging the power of 
                    <span className="italic text-white text-5xl"> AI </span> 
                    to improve your dietary habits
                </h1>
                <div className="p-10 flex">
                    <div className="w-1/2 px-5">
                        <BasicCard
                        header={choosingSP["header"]}
                        bulletPts={choosingSP["bulletPts"]}
                        ></BasicCard>
                    </div>
                    <div className="w-1/2 px-5">
                        <BasicCard
                        header={photoCard["header"]} 
                        imgKey={photoCard["imgKey"]} 
                        imgSrc={photoCard["imgSrc"]}
                        regularTxt={photoCard["regularTxt"]}></BasicCard>
                    </div>
                    <div className="w-1/2 px-5">
                        <BasicCard
                        header={howWorks["header"]}
                        bulletPts={howWorks["bulletPts"]}
                        ></BasicCard>
                    </div>
                </div>
                <h1 className="text-xl font-bold text-center">And guess what? It's all <span className="text-white italic">free</span> - forever!</h1>
                <button onClick={routeChange} className="flex mx-auto mb-10 animate-pulse mt-10 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 transform transition-transform duration-300 hover:scale-100 hover:animate-none">Try it for yourself</button>
            </section>
        </main>
    )
}

export default Home;