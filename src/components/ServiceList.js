import { useDispatch } from "react-redux";
import { setTransactionData } from "../utils/slice/transaction";
import { useNavigate } from "react-router-dom";

const ServiceList = ({ data, onClick }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return ( 
        <div className="flex flex-row space-x-10 mt-10">
            {data.map((apiData, index) => (
                <div 
                    key={index} 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => {
                        dispatch(setTransactionData({
                            service_name: apiData.service_name,
                            service_code: apiData.service_code,
                            service_tariff: apiData.service_tariff
                        }))
                        navigate('/servicetopup')
                    }}
                >
                    <img src={apiData.service_icon} alt="service pict"/>
                    <p className="text-center text-xs mt-3">{apiData.service_name}</p>
                </div>
            ))}
        </div>
    );
}
 
export default ServiceList;