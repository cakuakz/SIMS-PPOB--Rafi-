import { capitalCase } from "text-case";
import LogoText from "./LogoText";

const LayoutAuth = ({ children, title, linkText }) => {
    return ( 
        <div className="flex flex-row justify-between h-screen items-center w-full">
            <div className="flex flex-col justify-center items-center text-center w-full">
                <LogoText />
                <span className="text-black font-semibold text-2xl px-64 text-center my-10">{capitalCase(title)}</span>
                {children}
                {linkText}
            </div>
            <div className="bg-[#fff1f0] flex flex-col w-full">
                <img src="/login_illustration.png" alt="login illustration" className="h-screen"/>
            </div>
        </div>
     );
}
 
export default LayoutAuth;