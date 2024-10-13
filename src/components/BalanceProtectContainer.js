import React from 'react';

const BalanceProtect = () => {
    return (
        <div className="p-2 bg-white rounded-full"></div>
    );
}

const BalanceProtectContainer = ({ classNames }) => {
    return (
        <div className={`flex flex-row space-x-2 ${classNames}`}>
            {[...Array(7)].map((_, index) => (
                <BalanceProtect key={index} />
            ))}
        </div>
    );
}

export default BalanceProtectContainer;
