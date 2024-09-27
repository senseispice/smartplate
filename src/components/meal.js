import { AiOutlineClockCircle } from "react-icons/ai";


function Meal( props ) {    

    return (
        <div className="Meal">
            <p>{props.name}</p>
            <p><AiOutlineClockCircle/>  {props.time_required}</p>
        </div>
    )
}

export default Meal;