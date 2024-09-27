/*
Meal Plan component. Should be able to be passed a meal plan id, load that meal plan and display it in a useful manner. 
Should also be interactive, e.g. allow users to click a meal to learn more ++
*/

import database from "../features/database.js";
import Meal from "./meal";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BasicCard from "./basic_card.js";

// SAMPLE MEAL PLAN DATA (can be fetched from id)
const sample_meal_plan = {
    //name: "Sample Meal Plan",
    //date_created: "06/01/2023", // Always in this exact format: MM/DD/YYYY
    meals: {
        Monday: [
            { name: "Oat meal", time_required: "10min" },
            { name: "Ceasar salad", time_required: "15min" },
            { name: "Pasta bolognaise", time_required: "30min" }
        ],
        Tuesday: [
            { name: "Oat meal", time_required: "10min" },
            { name: "Ceasar salad", time_required: "15min" },
            { name: "Pasta bolognaise", time_required: "30min" }
        ],
        Wednesday: [
            { name: "Oat meal", time_required: "10min" },
            { name: "Ceasar salad", time_required: "15min" },
            { name: "Pasta bolognaise", time_required: "30min" }
        ],
        Thursday: [
            { name: "Oat meal", time_required: "10min" },
            { name: "Ceasar salad", time_required: "15min" },
            { name: "Pasta bolognaise", time_required: "30min" }
        ],
        Friday: [
            { name: "Oat meal", time_required: "10min" },
            { name: "Ceasar salad", time_required: "15min" },
            { name: "Pasta bolognaise", time_required: "30min" }
        ],
        Saturday: [
            { name: "Oat meal", time_required: "10min" },
            { name: "Ceasar salad", time_required: "15min" },
            { name: "Pasta bolognaise", time_required: "30min" }
        ],
        Sunday: [
            { name: "Oat meal", time_required: "10min" },
            { name: "Ceasar salad", time_required: "15min" },
            { name: "Pasta bolognaise", time_required: "30min" }
        ],
    }
}


async function MealPlanByID(id, user) {
    const mealPlan = await database.get_meal_plan(id, user); 
    console.log(mealPlan);
    return mealPlan;
}


function MealPlan( props ) { // Takes an id prop (string)
    const user = useSelector((state) => state.rootReducer.user)
    const [meal_plan, setMealPlan] = useState(sample_meal_plan);
    
    useEffect(() => {
        if (props.id !== null) {
            MealPlanByID(props.id, user)
                .then(fetchedMealPlan => {
                    console.log(fetchedMealPlan.meals.Saturday)
                    const reorderedMealPlan = {
                        meals: {
                            "Monday": fetchedMealPlan.meals.Monday,
                            "Tuesday": fetchedMealPlan.meals.Tuesday,
                            "Wednesday": fetchedMealPlan.meals.Wednesday,
                            "Thursday": fetchedMealPlan.meals.Thursday,
                            "Friday": fetchedMealPlan.meals.Friday,
                            "Saturday": fetchedMealPlan.meals.Saturday,
                            "Sunday": fetchedMealPlan.meals.Sunday,
                        }
                    }
                    setMealPlan(reorderedMealPlan);
                    console.log('Fetched meal plan: ', fetchedMealPlan);
                })
                .catch(error => {
                    console.error("Error fetching meal plan:", error);
                });
        }
    }, [props.id]);  // re-run the effect when `props.id` changes

    return (
        <div>
            <div className="p-5 flex grid-rows-2 grid-flow-auto">
            {Object.entries(meal_plan.meals).map(([day, meals]) => (
                <div key={day} className="p-2">
                    <div className="shadow-lg rounded-xl p-2 bg-white transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-102">
                        <p className="font-bold text-center text-lg p-2">{day}</p>
                        <div className="rounded-b-xl p-2">
                            <ul>
                            {meals.map((meal, index) => (
                                <li key={index}>
                                    <Meal name={meal.name} time_required={meal.time_required}/>
                                </li>
                            ))}
                            </ul>
                            {/* <span>Generated on {meal_plan.date_created}</span> */}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default MealPlan;