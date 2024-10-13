import { useState } from "react";
import BalanceProtectContainer from "./BalanceProtectContainer";
import Navbar from "./Navbar";

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
            <div className="flex flex-row justify-between px-20">
                <div className="grid">
                    <img 
                        src="/profile_pic.png" 
                        alt="profile_pic"
                    />
                    <p className="mt-8 text-lg">Selamat Datang, </p>
                    <h1 className="text-3xl ">{`${users.first_name} ${users.last_name}`}</h1>
                </div>
                <div>
                    <p className="absolute pl-4 pt-6 text-white text-base">Saldo anda</p>
                    <h1 
                        className="absolute pl-4 pt-14 text-white text-3xl font-semibold"
                    >
                        Rp. {balanceShow ? balance : <BalanceProtectContainer classNames="absolute top-[70px] pl-12" />}
                    </h1>
                    <span 
                        className="absolute pl-4 pt-28 text-white"
                    >
                        <span className="cursor-pointer" onClick={() => setBalanceShow(prev => !prev)}>Lihat saldo</span>
                    </span>
                    <img src="/bg_saldo.png" alt="bg saldo"/>
                </div>
            </div>
            {children}
        </div>
     );
}
 
export default AuthenticatedLayout;