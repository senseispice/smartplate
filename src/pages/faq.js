function FAQ() {

    const QandA = {"What is SmartPlate?":"SmartPlate is an innovative meal planning platform designed specifically for college students. It offers personalized meal plans tailored to your individual preferences, dietary requirements, and busy schedule. With SmartPlate, you can easily access healthy, varied, and customized meal options that make eating well in college a breeze."
    ,"How does SmartPlate work?":"SmartPlate utilizes advanced algorithms to generate personalized meal plans for each user. When you sign up, you'll provide information about your dietary preferences, any allergies or restrictions, and your goals. Our intelligent system then uses this information to create customized meal plans that meet your nutritional needs, while taking into account your preferences and schedule."
    ,"Who can benefit from using SmartPlate?":"SmartPlate is designed to benefit college students who want to eat healthy, save time, and enjoy a diverse range of meals. Whether you have specific dietary restrictions, follow a particular diet (vegetarian, vegan, etc.), or simply want a convenient way to plan your meals, Smartplate is here to help you succeed in college while nourishing your body."
    ,"Are the meal plans suitable for specific diets or allergies?":"Absolutely! SmartPlate supports a variety of dietary preferences and can accommodate various diets and allergies. Whether you're vegetarian, vegan, gluten-free, or have specific food allergies, our platform takes these factors into consideration when generating your meal plans. You can rest assured that Smartplate will provide you with meals that align with your dietary needs and restrictions."
    ,"Can I customize my meal plan?":"Yes, you have the flexibility to customize your meal plan to suit your preferences. Within your profile settings, you can adjust your meal preferences, portion sizes, and even set specific calorie goals. Smartplate understands that everyone has unique tastes and nutritional requirements, so we make it easy for you to tailor your meal plan according to your needs."}

    return (
        <div className="text-center pt-9 pb-9 bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x">
            <h1 className="font-bold text-4xl">Frequently Asked Questions</h1>
            {
                Object.entries(QandA).map(
                    ([question, answer]) =>
                     (
                        <div key={question} className="pt-7">
                            <h3 className="font-semibold text-xl pb-1">{question}</h3>
                            <p className="px-32 text-left">{answer}</p>
                        </div> 
                    )
                )
            }
        </div>
    )
}

export default FAQ;