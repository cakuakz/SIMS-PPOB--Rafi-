import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const TransactionCard = ({ type, description, amount, created }) => {
    const date = new Date(created)

    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
      
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    return ( 
        <div className="p-4 flex flex-row justify-between border border-slate-400 rounded">
            <div className="flex flex-col">
                <div className="flex flex-row items-center space-x-2">
                    {type === "TOPUP" ? <FaPlus className="text-slate-400 mt-1" /> : <FaMinus className="text-red-600"/>}
                    <p className={`${type === "TOPUP" ? 'text-slate-400' : 'text-red-600'} text-xl font-semibold`}>Rp. {amount}</p>
                </div>
                <p className="text-xs mt-4">{formattedDateTime}</p>
            </div>
            <p className="text-xs">{description}</p>
        </div>
    );
}
 
export default TransactionCard;