/*
Navbar component. Will be displayed at the top of all pages
*/

import logo from "../assets/logo.jpg";

const titles = ['Home', 'About', 'Profile', 'Meal Plans'];
function Navbar() {
    return (
          <header className="shadow p-4 lg:px-8 sticky top-0 bg-white z-50">
            <nav className="flex items-center relative">
                <div className="w-10 mr-3 h-auto">
                    <img src={logo} alt="logo"></img>
                </div>
              <div>
                <span className="flex text-2xl font-semibold"><a href="/home" className="hover:text-emerald-500">SmartPlate</a></span>
              </div>
              <div className='flex flex-row space-x-7 absolute right-0'>
                  {
                    titles.map( (title) => {
                    return (<div className='text-black hover:underline underline-offset-2 font-semibold hover:text-emerald-500'><a href={`/${title.toLowerCase()}`}>{title}</a></div>)
                    })
                  }
              </div>
            </nav>
          </header>

    )
}

export default Navbar;