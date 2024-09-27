import axios from "axios";
import database from "./database.js";
import { Configuration, OpenAIApi } from "openai";

/*
    POSSIBLE PARAMS (passed as dictionary)
    - diet
    - allergies
    - dietary_restrictions
    - goal
    - Activity level
    - Special requests
    - meal_frequency
    - time_frame

    generate_meal_plan is an asynchronous function, meaning there should be some activity indication UI while the result is being fetched

    Returns an object of the following form:
    {
        id: SOME_UNIQUE_STRING,
        description: STRING,
        meals: [
            {
                day: number 1-7 (Monday-Friday),
                meal: number (nth meal of the day),
                description: STRING
            },
            ...
        ]
    }
*/

const configuration = new Configuration({
  apiKey: "INSERT YOUR_API_KEY HERE", // Replace YOUR_API_KEY with your actual OpenAI API key
});

const openai = new OpenAIApi(configuration);

  const generate_image = async (userName) => {
      const res = await openai.createImage({
        prompt: `profile picture with the name ${userName} hidden in it, picasso, modern, exciting`,
        n: 1,
        size: "512x512",
      });

      console.log("Image URL: ", res.data.data[0].url);
      return res.data.data[0].url;
    };

async function generate_meal_plan(profile, params, user) 
{
    const prompt = generate_prompt(profile, params);
    console.log("Generating GPT Response");
    const response = await generate_response(prompt);
    console.log("GPT Response Generated");
    const meal_plan = string_to_meal_plan(response, user);
    return meal_plan;
}

// Takes a string and converts it to a meal plan object
async function string_to_meal_plan(s, user)
{
    console.log(s);
    const meal_plan = JSON.parse(s);
    const returnVal = await database.add_meal_plan(meal_plan, user);
    return returnVal;
}

// Takes a prompt string and returns an AI-generated response (async)
async function generate_response(prompt) {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        "prompt": prompt,
        "model": "text-davinci-003", // Not using gpt-3.5 due to rate limiting at 3 req/min which is not enough
        "max_tokens": 1000, // Adjust the max_tokens value to control the response length
        "temperature": 0.65 // Adjust the temperature value to control the response creativity (higher values make it more random)
      }, {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY', // Replace YOUR_API_KEY with your actual OpenAI API key
          'Content-Type': 'application/json',
        }
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error generating response:', error);
      return '';
    }
  }

/* Does not have any required parameters
   Returns a string (the prompt)
*/
function generate_prompt(profile, params)
{
    // Notes:
    // - Careful to have spaces before the start of new sentences

    let prompt = "Design a meal plan for a student, considering the requirements that follow. Give the answer in the form of a JSON object, and nothing else.";
    prompt += " The JSON object should have the following format: { \"meals\": { \"Monday\": [ { \"name\": \"Oat meal\", \"time_required\": \"10min\" }, { \"name\": \"Ceasar salad\", \"time_required\": \"15min\" }, { \"name\": \"Pasta bolognaise\", \"time_required\": \"30min\" }], \"Tuesday\": [...] } } \n(Keep in mind that here it was filled with sample data, which you should disregard) The JSON object MUST contain all seven days of the week, Monday through Sunday and be capitalized as in the example. The \"name\" attribute should describe the meal in about 20-100 characters. The \"time_required\" attribute should give an indication of the amount of time required to prepare the meal."

    // Allergies
    if (params.allergens !== "") {
        prompt += ' The person has the following allergies: ' + params.allergens;
    } else { prompt += ' The person has no allergies.'; }

    // Goal
    prompt += " The person has the following goal: " + params.goal;

    // Diet
    if (params.diet !== "None") {
        prompt += ' The person follows this diet: ' + params.diet;
    } else { prompt += ' The person does not follow a specific diet.'; }

    // Budget
    prompt += " The person has the following daily budget for food: " + params.budget;

    // Number of daily meals
    prompt += " The person wants to eat " + params.meals_per_day + " meals per day."

    console.log("Meal plan generation prompt:");
    console.log(prompt);
    return prompt;
}

export default {generate_meal_plan, generate_image};
