import { useNavigate } from "react-router-dom";
import { LANGUAGE } from "../utils/constants/language";

const LogoText = () => {
    const navigate = useNavigate()

    return ( 
        <div 
            className="flex flex-row space-x-2 cursor-pointer"
            onClick={() => {
                navigate('/homepage')
            }}
        >
            <img src="/sims_logo.png" alt="logo sims" />
            <p className="text-black font-semibold text-xl">{LANGUAGE.BANNER_TEXT.TITLE}</p>
        </div>
     );
}
 
export default LogoText;