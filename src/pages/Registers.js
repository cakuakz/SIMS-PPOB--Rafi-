import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import LayoutAuth from "../components/LayoutAuth";
import { RegisterInputAttribute } from "../components/static";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../utils/validation/auth";
import { registerUser } from "../utils/services/auth";
import toast from "react-hot-toast";
import { titleCase } from "text-case";
import { LANGUAGE } from "../utils/constants/language";
import { useState } from "react";

const LinkedText = ({ href }) => {
    return (
        <span className="text-gray-600 font-normal text-base text-center">
            sudah punya akun? login <a href={href} className="text-red-600 font-bold">di sini</a>
        </span>
    )
}

const Registers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        reset
    } = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            confirm_password: ''
        }
    })

    const onSubmit = async () => {
        if (getValues("password") !== getValues("confirm_password")) {
            toast.error(titleCase(LANGUAGE.VALIDATION.PASSWORD_MATCH))
        } else {
            setIsLoading(true)
            const payload = {
                email: getValues("email"),
                first_name: getValues("first_name"),
                last_name: getValues("last_name"),
                password: getValues("password")
            }
    
            await registerUser(payload)
            .then((response) => {
                reset({
                    email: '',
                    first_name: '',
                    last_name: '',
                    password: '',
                    confirm_password: ''
                })
                toast.success(response.message)
                console.log(response)
                setIsLoading(false)
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message || "An error occurred")
                }
                console.error(error)
                setIsLoading(false)
            })
        }
    }

    return ( 
        <LayoutAuth
            title="Lengkapi data untuk membuat akun"
            linkText={<LinkedText href="/" />}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center my-4 space-y-6"
            >
                {RegisterInputAttribute.map((attribute) => (
                    <CustomInput
                        register={register}
                        name={attribute.name}
                        label={attribute.label}
                        type={attribute.type}
                        logo={attribute.logo}
                        error={errors[attribute.name]}
                    />
                ))}
                <CustomButton 
                    text="Registrasi"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </LayoutAuth>
    );
}
 
export default Registers;