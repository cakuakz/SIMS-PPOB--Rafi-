import { useNavigate } from "react-router-dom";

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
            <p className="text-black font-semibold text-xl">SIMS PPOB</p>
        </div>
     );
}
 
export default LogoText;