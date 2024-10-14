import { Link, useLocation } from "react-router-dom";
import LogoText from "./LogoText";

const Navbar = () => {
    const location = useLocation()

    const getLinkClass = (path) => {
        return location.pathname === path ? "nav-link-pressed" : "nav-link"
    }

    return ( 
        <nav className="px-20 py-5 flex flex-row justify-between items-center">
            <LogoText />
            <ul className="flex flex-row space-x-10">
                <li>
                    <Link className={getLinkClass("/topup")} to="/topup">
                        Top Up                    
                    </Link>
                </li>
                <li>
                    <Link className={getLinkClass("/transaction")} to="/transaction">
                        Transaction
                    </Link>
                </li>
                <li>
                    <Link className={getLinkClass("/akun")} to="/akun">
                        Akun
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
