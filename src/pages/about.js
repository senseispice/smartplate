import diningTable from "../assets/diningtable.jpg";

function About() {

    return(
        <div className="text-center bg-gradient-to-tr from-teal-200 via-green-400 to-yellow-400 animate-gradient-x">
            <img src={diningTable} alt="dining table" className="mx-auto w-1/3 h-auto pt-9"></img>
            <h1 className="text-4xl font-bold py-9 text-white">SmartPlate is a...</h1>
            <p className="pb-5 px-32">CS35L project born from the desire of college students to find an easier way to eat. 
                Students lack time, knowledge, and money when it comes to shopping and eating. 
                To remedy that, we employed generative AI and our own skills to produce a webapp that reduces the burdens of meal planning.</p>
            <p className="font-bold pt-5">We think you'll like it :P </p>
            <p className="font-semibold pt-3">-Abhi, Ariv, Austin, Matthew, & Marius</p>
        </div>
    );
}

export default About;