import Meal from "./meal";
function BasicCard({ header, regularTxt, bulletPts, imgKey, imgSrc, jsxComponents, meals }) {

/* Basic Card. 
 - Requires header (str)
 - OPTIONAL:
    - regularTxt: str
    - image: must include imgKey (str) and imgSrc
    - bulletPts: array of str 
    - jsxComponents: ready jsx components you want to add to the card
    - meals: specifically for meals mapping on meal plan creation
*/

    //check if regtxt
    function isRegTxt(regularTxt){
        if(regularTxt){
            return(
                <div className='subpixel-antialiased'>{regularTxt}</div>
            )
        } else {
            return (<></>);
        }
    }

    //check if img
    function isImage(imgKey){
        if(imgKey){
            return(
                <div className="flex justify-center items-center w-full h-auto relative rounded-xl p-1">
                    <img key={imgKey} src={imgSrc} alt={imgKey} className="rounded-2xl"/>
                </div>
            );
        } else {
            return (<></>);
        }
    }

    //check if bulletPts
    function isBulletPts(bulletPts){
        if(bulletPts){
            return(
                <ul>
                    { bulletPts.map( (bullet, index) => {
                        return(<li key={index}>{bullet}</li>);
                    })}
                </ul>
            );

        } else {
            return(<></>);
        }
    }

    function extraComponents(propJSX){
        if(propJSX)
        {
            console.log(`Extra components added`);
            return(propJSX());
        } else {
            return (<></>);
        }
    }

    function isMeals(Meals){
        if(Meals){
            return(
                <ul>
                    {Object.values(Meals).map((meal, index) => (
                        <li key={index}>
                            <Meal name={meal.name} time_required={meal.time_required}/>
                        </li>
                    ))}
                </ul>
            );
        } else {
            return (<></>);
        }
        
    }

    return(
        <div className="shadow-lg rounded-xl p-3 w-full bg-white transition duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-102">
            {isImage(imgKey)}

            <p className="font-bold text-center text-lg p-2">{header}</p>

            <div className="rounded-b-xl p-2">
                {isRegTxt(regularTxt)}
                {isBulletPts(bulletPts)}
                {extraComponents(jsxComponents)}
                {isMeals(meals)}
            </div>
        </div>
    );
}

export default BasicCard;