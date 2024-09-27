import database from "../features/database";
import { useDispatch } from "react-redux";

/* Used on Login/Sign Up Page */
function ButtonCard({ header, subheader, update, textOn, loginButtons }){
    const dispatch = useDispatch();
    /* Generic ButtonCard that can vary in number of buttons
    Header: str
    Subheader: str
    buttons: useState function that updates state of a particular button's boolean condition
    textOn: list of text per button
    update: react hook to say which button was clicked
    loginButtons: function that returns jsx for login buttons
    */

    //check if header
    function isHeader(header, subheader){
        if(header && !subheader){
            return(
                <div className='font-bold text-center text-lg p-2'>{header}</div>
            )
        } else if(header && subheader) {
            return(
                <>
                    <div className='font-bold text-lg p-2'>{header}</div>
                    <div className="italic subpixel-antialiased p-1">{subheader}</div>
                </>
            )
        } else {
            return (<></>);
        }
    }

    function isButtons(update, textOn){
            if(textOn){
                return textOn.map( (currTxt) => {
                    return (<button onClick={ () => update(currTxt)} type="button" className="mt-10 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 transform transition-transform duration-300">{currTxt}</button>);
                })    
            } else {
                return(<></>);
            }
        }

    function login(propJSX){
        console.log(`Login function`);
        //database.log_in_google(dispatch);
        if(propJSX)
        {
            //console.log(`Logging in ` + dispatch);
            //database.log_in(dispatch);
            console.log(`Returning component`);
            return(propJSX());
        } else {
            return (<></>);
        }
    }

    // function isButtons(buttons){
    //     if(buttons){
    //         return Object.entries(buttons).map(
    //             ([textOn, routeFunction]) =>
    //             {
    //                 console.log(textOn, routeFunction);
    //                 return (<button onClick={routeFunction} type="button" className="mt-10 text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-7 py-3 transform transition-transform duration-300 hover:scale-100">{textOn}</button>);
    //             }
    //         )
    //     } else {
    //         return(<></>);
    //     }
    // }

    return(
        <div className="shadow-lg rounded-xl p-3 w-full bg-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-102 text-center">
            {isHeader(header, subheader)}
            <div className="flex justify-evenly pb-4">
                {isButtons(update, textOn)}
                {login(loginButtons)}
            </div>
        </div>
    );
}

export default ButtonCard;