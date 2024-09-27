import MealPlan from "../components/meal_plan";
import gpt from "../features/gpt-api.js";
import database from "../features/database";
import { useState, useEffect } from "react";
import LoadingIcons from 'react-loading-icons';
import { useSelector } from "react-redux";
import BasicCard from "../components/basic_card";
import mealplankid from "../assets/mealplankid.jpg";
import kidsloading from "../assets/kidsloading.jpg";



function MealPlanParams( props ) {

    const [allergens, setAllergens] = useState("");
    const [budget, setBudget] = useState("$16-$20");
    const [goal, setGoal] = useState("Weight maintenance");
    const [timeCommitment, setTimeCommitment] = useState("30-60min");
    const [mealsPerDay, setMealsPerDay] = useState("3");
    const [additionalComments, setAdditionalComments] = useState("")
    const [diet, setDiet] = useState("None");


    const onAllergenInput = (element) => { setAllergens(element.target.value); updateParams(); }
    const onCommentInput = (element) => { setAdditionalComments(element.target.value); updateParams(); }

    function updateParams() {
        const params = {
            diet: diet,
            allergens: allergens,
            budget: budget,
            goal: goal,
            time_commitment: timeCommitment,
            meals_per_day: mealsPerDay,
            additional_comments: additionalComments
        };
        props.setMealPlanParams(params);
    }

    //to clean up the html components
    const dietOptions = ["None", "Vegetarian", "Vegan", "Keto", "Paleo", "Pescetarian"];
    const budgetOptions = ["$0-$10", "$11-$15", "$16-$20", "$21-$25", "$26-$30", "$31-$35"];
    const weightOptions = ["Maintenance", "Weight loss", "Weight gain"];
    const timeOptions = ["<30min", "30-60min","60-90min", ">90min"];
    const mealsOptions = ["1", "2", "3", "4", "5"];

    useEffect(() => {
        updateParams();
    }, []);


    function dietOpts(){
        return(
            <div className="text-center p-3 font-semibold">
                Diet: <b></b>
                <select name="budget" value={diet} onChange={(element) => {setDiet(element.target.value); updateParams();}} className="font-light rounded-lg text-white bg-[#1da1f2]">
                    {dietOptions.map( (option) => {
                        return(
                            <option value={option} selected>{option}</option>
                        );
                    })}
                </select>
            </div>
        );
    }
    function budgetOpts(){
        return(
            <div className="text-center p-3 font-semibold">
                Budget (daily): <b></b>
                <select name="budget" value={budget} onChange={(element) => {setBudget(element.target.value); updateParams();}} className="font-light rounded-lg text-white bg-[#1da1f2]">
                    {budgetOptions.map( (option) => {
                        return(
                            <option value={option} selected>{option}</option>
                        );
                    })}
                </select>
            </div>
        );
    }
    function weightOpts(){
        return(
            <div className="text-center p-3 font-semibold">
                Weight: <b></b>
                <select name="goal" value={goal} onChange={(element) => {setGoal(element.target.value); updateParams();}} className="font-light rounded-lg text-white bg-[#1da1f2]">
                    {weightOptions.map( (option) => {
                        return(
                            <option value={option} selected>{option}</option>
                        );
                    })}
                </select>
            </div>
        );
    }
    function timeOpts(){
        return(
            <div className="text-center p-3 font-semibold">
                Desired time commitment (daily): <b></b>
                <select name="time_commitment" value={timeCommitment} onChange={(element) => {setTimeCommitment(element.target.value); updateParams();}} className="font-light rounded-lg text-white bg-[#1da1f2]">
                    {timeOptions.map( (option) => {
                        return(
                            <option value={option} selected>{option}</option>
                        );
                    })}
                </select>
            </div>
        );
    }
    function mealsOpts(){
        return(
            <div className="text-center p-3 font-semibold">
                Number of meals per day: <b></b>
                <select name="meals_per_day" value={mealsPerDay} onChange={(element) => {setMealsPerDay(element.target.value); updateParams();}} className="font-light rounded-lg text-white bg-[#1da1f2]">
                    {mealsOptions.map( (option) => {
                        return(
                            <option value={option} selected>{option}</option>
                        );
                    })}
                </select>
            </div>
        );
    }

    return (
        <div className="p-5 grid place-items-center">
            {dietOpts()}
            {budgetOpts()}
            {weightOpts()}
            {timeOpts()}
            {mealsOpts()}
            <h5 className='p-3 font-semibold'>Allergens (comma separated):</h5>
            <form>
                <input id="searchbox" type="text" placeholder="All them nuts :P" value={allergens} onInput={onAllergenInput} className='border-2 border-[#1da1f2] py-1.5 mx-2 rounded-xl focus:ring-green-500 focus:border-emerald-500'></input>
            </form>

            <h5 className='p-3 font-semibold'>Additional notes:</h5>
            <form>
                <textarea
                    id="notes"
                    placeholder="Write anything you'd like our AI to know :)"
                    value={additionalComments}
                    onChange={onCommentInput}
                    className='border-2 border-black py-2 px-2 mx-2 rounded-xl focus:ring-green-500 focus:border-emerald-500'
                    rows="4"
                ></textarea>
            </form>
        </div>
    )
}

function MealPlans() {
    const user = useSelector((state) => state.rootReducer.user)
    const [meal_plan, setMealPlan] = useState(null);
    const [count, setCount] = useState(0); // Initial count value is 0
    const [mealPlanParams, setMealPlanParams] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [mealPlansNumbers, setMealPlanNumbers] = useState([])
    const [searching, setSearching] = useState(false);

    const handleGenerateMealPlan = async () => {
        console.log(user);
        setMealPlan("Loading");
        const planID = await gpt.generate_meal_plan({}, mealPlanParams, user); // Wait for the async function to complete
        const mealPlanNum = await database.generate_meal_number(user);
        setCount(mealPlanNum);
        setTimeout(() => {
          setMealPlan(planID);
        }, 0); 
    };

    const loadMealPlan = async (number) => {
        console.log(user);
        setMealPlan("Loading");
        const planID = await database.get_meal_id(number, user);
        setMealPlan(planID);
    };

    async function reloadButtons() {
        const mealPlanNum = await database.generate_meal_number(user);
        setCount(mealPlanNum);
    }

    useEffect(() => {
        reloadButtons();
    }, []);

    const renderButtons = () => {
      const buttons = [];
      console.log('BUTTON COUNT: ', count);
      for (let i = 1; i <= count; i++) {
        buttons.push(
          <button
            key={i}
            className="col-span-1 mt-10 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 transform transition-transform duration-300"
            onClick={() => loadMealPlan(i - 1)}
          >
            Meal Plan #{i}
          </button>
        );
      }
      return buttons;
    };

    function mealPlanFormJSX(){
        return (
            <div className="flex flex-col items-center">
                <h3 className="text-center font-bold text-xl"></h3>
                <MealPlanParams setMealPlanParams={setMealPlanParams}/>
                <button className="self-center text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-bold rounded-lg px-4 py-2 transform transition-transform duration-300" onClick={handleGenerateMealPlan}>Generate</button>
            </div>
        );
    }

    function loadingSpinner(){
        return (
            <div role="status flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
            </div>
        );
    }

    function updateSearch(e) {
        setSearchTerm(e.target.value)
    }

    const getAllStrings = (arg) => {
        if (typeof arg === "string") {
          return [arg];
        }
      
        // handle wrong types and null
        if (typeof arg !== "object" || !arg) {
          return [];
        }
      
        return Object.keys(arg).reduce((acc, key) => {
          return [...acc, ...getAllStrings(arg[key])];
        }, []);
      };

    async function search() {
        if (searchTerm === "") {
            setSearching(false);
            return;
        }
        let mealPlanNums = [];
        for (let i = 0; i < count-1; i++) {
            let id = await database.get_meal_id(i, user)
            let plan = await database.get_meal_plan(id, user)
            let fullStrings = getAllStrings(plan).join(' ');
            if (fullStrings.toLowerCase().includes(searchTerm.toLowerCase())) {
                mealPlanNums.push(i+1);
            }
        }
        setMealPlanNumbers(mealPlanNums);
        setSearching(true);
    }

    if (meal_plan === null) {
        return (
            <div className="flex min-h-screen bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x">
                <div className="w-1/7 bg-white p-4 overflow-y-auto">
                    <input type="text" placeholder="Search here" onChange={updateSearch} value={searchTerm} className="rounded p-2 border my-2"/>
                    <button onClick={search} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg block mb-2">Search</button>
                    <br/>
                    {Array(count).fill().map((_, index) => {
                        console.log("Rerendering buttons")
                        if (index === 0) {
                            return (<button className="my-4 shadow text-white bg-red-500 hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-bold rounded-lg py-2 px-4 transform transition-transform duration-300"
                                onClick={() => setMealPlan(null)}>Generate new</button>)
                        } else if (mealPlansNumbers.includes(index) && searching === true) {
                            return (<button key={index}
                                className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg block mb-2"
                                onClick={() => loadMealPlan(index-1)}>Meal Plan #{index}</button>)
                        } else {
                            return (<button key={index}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg block mb-2"
                                onClick={() => loadMealPlan(index-1)}>Meal Plan #{index}</button>)
                        }
                    })}
                </div>
                <div className="w-1/3 mx-auto py-10">
                    <BasicCard
                    header={`Customize Meal Plan:`}
                    imgKey={`mealplankid`}
                    imgSrc={mealplankid}
                    jsxComponents={mealPlanFormJSX}
                    ></BasicCard>
                </div>
    
            </div>
        )
    } else if (meal_plan === "Loading") {
        return (
            <div className="flex min-h-screen bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x">
                <div className="w-1/7 bg-white p-4 overflow-y-auto">
                    <input type="text" placeholder="Search here" onChange={updateSearch} value={searchTerm} className="rounded p-2 border my-2"/>
                    <button onClick={search} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg block mb-2">Search</button>
                {Array(count).fill().map((_, index) => {
                        if (index === 0) {
                            return (<button className="my-4 shadow text-white bg-red-500 hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-bold rounded-lg py-2 px-4 transform transition-transform duration-300"
                                onClick={() => setMealPlan(null)}>Generate new</button>)
                        } else if (mealPlansNumbers.includes(index) && searching === true) {
                            return (<button key={index}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg block mb-2"
                                onClick={() => loadMealPlan(index-1)}>Meal Plan #{index}</button>)
                        } else {
                            return (<button key={index}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg block mb-2"
                                onClick={() => loadMealPlan(index-1)}>Meal Plan #{index}</button>)
                        }
                    })}
                </div>

                <div className="w-6/7 mx-auto flex items-center justify-center">
                    <div className="p-4 max-w-md">
                        <BasicCard
                        header={`Loading, your meal plan will appear automagically...`}
                        imgKey={`Kids Chasing Food`}
                        imgSrc={kidsloading}
                        jsxComponents={loadingSpinner}
                        ></BasicCard>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex min-h-screen bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x">
                <div className="w-1/7 bg-white p-4 overflow-y-auto">
                <input type="text" placeholder="Search here" onChange={updateSearch} value={searchTerm} className="rounded p-2 border my-2"/>
                    <button onClick={search} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg block mb-2">Search</button>
                    {Array(count).fill().map((_, index) => {
                        if (index === 0) {
                            return (<button className="my-4 shadow text-white bg-red-500 hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-bold rounded-lg py-2 px-4 transform transition-transform duration-300"
                                onClick={() => setMealPlan(null)}>Generate new</button>)
                        } else if (mealPlansNumbers.includes(index) && searching === true) {
                            return (<button key={index}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg block mb-2"
                                onClick={() => loadMealPlan(index-1)}>Meal Plan #{index}</button>)
                        } else {
                            return (<button key={index}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg block mb-2"
                                onClick={() => loadMealPlan(index-1)}>Meal Plan #{index}</button>)
                        }
                    })}
                </div>
                <div className="min-w-screen overflow-x-auto p-4 bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x flex items-top justify-center">
                    <MealPlan id={meal_plan}/>
                </div>
            </div>
        )
    }
}

export default MealPlans
