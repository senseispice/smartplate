/*
Footer component. Will be displayed at the bottom of all pages
*/

//const titles = ['Sign up', 'FAQ', 'Contact us'];

function Footer() {
    return (       
        <footer className="bg-white rounded-lg shadow">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-400 sm:text-center">© 2024 <a className="hover:underline">SmartPlate™</a> Abhi, Ariv, Austin, Matthew, & Marius for COM SCI 35L
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
                <li>
                    <a href="/profile" className="mr-4 hover:underline md:mr-6 ">Login</a>
                </li>
                <li>
                    <a href="/faq" className="mr-4 hover:underline md:mr-6 ">FAQ</a>
                </li>
                <li>
                    <a href="mailto:mariusg@g.ucla.edu" className="mr-4 hover:underline md:mr-6 ">Contact us</a>
                </li>
            </ul>
            </div>
        </footer>

    )
}

export default Footer;