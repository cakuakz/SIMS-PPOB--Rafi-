import { useDispatch, useSelector } from "react-redux";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TopupSchema } from "../utils/validation/topup";
import { FaRegKeyboard } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import { TopupPriceCard } from "../components/static";
import TopupCard from "../components/TopupCard";
import { usePostTopupBalanceMutation } from "../utils/services/transaction";
import toast from "react-hot-toast";
import { setBalanceData } from "../utils/slice/user";
import { useState } from "react";

const Topup = () => {
    const user = useSelector((state) => state.user.data)
    const dispatch = useDispatch()
    const [postTopupBalance] = usePostTopupBalanceMutation()
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(TopupSchema),
    })
    
    const handleChange = (e) => {
        setValue("top_up_amount", Number(e.target.value))
        setIsButtonDisabled(e.target.value === "" || e.target.value === null)
    }

    const onSubmit = () => {
        const payload = {
            top_up_amount: getValues("top_up_amount")
        }

        postTopupBalance(payload)
            .unwrap()
            .then((res) => {
                if (res && res.status === 102) {
                    toast.error(res.message)
                } else {
                    toast.success(res && res.message)
                    dispatch(setBalanceData(res.data.balance))
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <AuthenticatedLayout
            users={user}
            balance={user.balance}
        >
            <div className="flex flex-col px-20">
                <div className="flex flex-col my-16">
                    <p className="text-xl">Silahkan masukan</p>
                    <h1 className="text-3xl font-semibold">Nominal Top Up</h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-row justify-between xl:space-x-4">
                        <div className="flex flex-col space-y-6 w-full">
                            <CustomInput 
                                register={register}
                                name="top_up_amount"
                                label="masukkan nominal Top Up"
                                type="number"
                                logo={<FaRegKeyboard className="text-slate-400"/>}
                                error={errors.top_up_amount}
                                onChange={handleChange}
                                width="full"
                            />
                            <CustomButton 
                                text="Top Up"
                                type="submit"
                                width="full"
                                disabled={isButtonDisabled}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-3 w-[600px]">
                            {TopupPriceCard.map((card) => (
                                <TopupCard 
                                    key={card.key}
                                    price={card.price}
                                    onClick={() => setValue("top_up_amount", card.value)}
                                />
                            ))}
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
        
    );
}
 
export default Topup;