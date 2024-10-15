import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoText from "./LogoText";
import { capitalCase } from "text-case";
import { LANGUAGE } from "../utils/constants/language";

const Navbar = () => {
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const getLinkClass = (path) => {
        return location.pathname === path ? "nav-link-pressed" : "nav-link"
    }

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    return (
        <nav className="px-4 lg:px-20 py-5 flex flex-row justify-between items-center relative">
            <LogoText />
            <div className="lg:hidden">
                <button onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            <ul className={`lg:flex flex-row lg:space-x-10 ${isMenuOpen ? "block" : "hidden"} lg:block absolute lg:relative top-16 lg:top-auto left-0 right-0 bg-white lg:bg-transparent lg:space-x-10 p-4 lg:p-0 shadow-lg lg:shadow-none`}>
                <li>
                    <Link className={getLinkClass("/topup")} to="/topup" onClick={() => setIsMenuOpen(false)}>
                        {capitalCase(LANGUAGE.NAVBAR.TOPUP)}                   
                    </Link>
                </li>
                <li>
                    <Link className={getLinkClass("/transaction")} to="/transaction" onClick={() => setIsMenuOpen(false)}>
                        {capitalCase(LANGUAGE.NAVBAR.TRANSACTION)}    
                    </Link>
                </li>
                <li>
                    <Link className={getLinkClass("/akun")} to="/akun" onClick={() => setIsMenuOpen(false)}>
                        {capitalCase(LANGUAGE.NAVBAR.AKUN)}    
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
