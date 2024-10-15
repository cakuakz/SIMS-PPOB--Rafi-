import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../components/CustomButton.js";
import CustomInput from "../components/CustomInput.js";
import LayoutAuth from "../components/LayoutAuth.js";
import { LoginInputAttribute } from "../components/static.js";
import { LoginSchema } from "../utils/validation/auth.js";
import { useForm } from "react-hook-form";
import { loginUser } from "../utils/services/auth.js";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../utils/constants/storage.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { LANGUAGE } from "../utils/constants/language.js";

const LinkedText = ({ href }) => {
    return (
        <span className="text-gray-600 font-normal text-base text-center">
            belum memiliki akun? registrasi <a href={href} className="text-red-600 font-bold">di sini</a>
        </span>
    )
}

const Login = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async () => {
        setIsLoading(true)
        const payload = {
            email: getValues("email"),
            password: getValues("password")
        }
        
        await loginUser(payload)
            .then((response) => {
                if (response && response.data.token) {
                    setCredentials(response)
                    navigate("/homepage")
                } else if (response.status === 400) {
                    toast.error(response.data.message)
                } else {
                    console.error("Login failed: No token received")
                }
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setIsLoading(false)
            })
    }

    return ( 
        <LayoutAuth
            title={LANGUAGE.BANNER_TEXT.LOGIN_TITLE}
            linkText={<LinkedText href="/register" />}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center my-4 space-y-8"
            >
                {LoginInputAttribute.map((attribute) => (
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
                    text="Masuk"
                    type="submit"
                    isLoading={isLoading}
                />
            </form>
        </LayoutAuth>
    );
}
 
export default Login;