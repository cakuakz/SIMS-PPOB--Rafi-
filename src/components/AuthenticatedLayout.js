import { useState } from "react";
import BalanceProtectContainer from "./BalanceProtectContainer";
import Navbar from "./Navbar";
import { defaultProfPic } from "./static";
import { capitalCase } from "text-case";
import { LANGUAGE } from "../utils/constants/language";

const AuthenticatedLayout = ({ 
    children, 
    users,
    balance,
}) => {
    const [balanceShow, setBalanceShow] = useState(false)

    return ( 
        <div className="flex flex-col h-screen">
            <Navbar />
            <hr className="mb-6"/>          
            <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:px-20 px-4">
                <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
                    <img 
                        src={users.profile_image === defaultProfPic ? "/profile_pic.png" : users.profile_image}
                        alt="profile_pic"
                        className="w-24 h-24 lg:w-28 lg:h-28 rounded-full"
                    />
                    <p className="mt-4 lg:mt-6 text-lg">{`${capitalCase(LANGUAGE.BANNER_TEXT.WELCOME)}, `}</p>
                    <h1 className="text-2xl lg:text-3xl font-semibold">{`${users.first_name} ${users.last_name}`}</h1>
                </div>
                <div className="relative mt-8 lg:mt-0 w-full lg:w-auto">
                    <img 
                        src="/bg_saldo.png" 
                        alt="bg saldo" 
                        className="w-full h-40 lg:w-auto lg:h-auto"
                    />
                    <p className="absolute top-4 left-4 text-white text-base">
                        {capitalCase(LANGUAGE.BANNER_TEXT.TRANSACTION.BALANCE)}
                    </p>
                    <h1 
                        className="absolute top-14 left-4 text-white text-2xl lg:text-3xl font-semibold"
                    >
                        Rp. {balanceShow ? balance : <BalanceProtectContainer classNames="absolute top-4 left-12" />}
                    </h1>
                    <span 
                        className="absolute top-28 left-4 text-white cursor-pointer"
                        onClick={() => setBalanceShow(prev => !prev)}
                    >
                        {capitalCase(LANGUAGE.BANNER_TEXT.TRANSACTION.SHOW_BALANCE)}
                    </span>
                </div>
            </div>
            <div className="flex-grow">
                {children}
            </div>
        </div>
     );
}
 
export default AuthenticatedLayout;
