import { useSelector } from "react-redux";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { FaRegKeyboard } from "react-icons/fa";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { usePostServicePaymentMutation } from "../utils/services/transaction";

const ServiceTopup = () => {
    const user = useSelector((state) => state.user.data)
    const transaction = useSelector((state) => state.transaction.data)
    const [postServicePayment] = usePostServicePaymentMutation()

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = () => {
        const payload = {
            service_code: transaction.service_code
        }
        
        if (user.balance <= transaction.service_tariff) {
            toast.error("Saldo tidak mencukupi")
        } else {
            postServicePayment(payload)
                .unwrap()
                .then((res) => {
                    toast.success(res && res.message)
                })
                .catch((error) => {
                    console.error(error)
                    toast.error(error && error.message)
                })
        }
    }

    return (
        <AuthenticatedLayout
            users={user}
            balance={user.balance}
        >
            <div className="flex flex-col px-20">
                <div className="flex flex-col my-16">
                    <p className="text-xl">Pembayaran</p>
                    <h1 className="text-3xl font-semibold">{transaction.service_name}</h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="flex flex-col space-y-6 w-full">
                        <CustomInput
                            register={register}
                            name="service_code"
                            label="masukkan nominal Top Up"
                            value={transaction.service_tariff}
                            logo={<FaRegKeyboard className="text-slate-400"/>}
                            width="full"
                            disabled
                        />
                        <CustomButton 
                            text="Top Up"
                            type="submit"
                            width="full"
                        />
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
 
export default ServiceTopup;