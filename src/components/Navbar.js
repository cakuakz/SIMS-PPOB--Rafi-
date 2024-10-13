import { Link } from "react-router-dom";
import LogoText from "./LogoText";

const Navbar = () => {
    return ( 
        <nav className="px-20 py-5 flex flex-row justify-between items-center">
            <LogoText />
            <ul className="flex flex-row space-x-10">
                <li>
                    <Link className="nav-link" to="/topup">
                        Top Up                    
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/transaction">
                        Transaction
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/akun">
                        Akun
                    </Link>
                </li>
            </ul>
        </nav>
     );
}
 
export default Navbar;