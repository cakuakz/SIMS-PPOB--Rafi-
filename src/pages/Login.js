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

const LinkedText = ({ href }) => {
    return (
        <span className="text-gray-600 font-normal text-base text-center">
            belum memiliki akun? registrasi <a href={href} className="text-red-600 font-bold">di sini</a>
        </span>
    )
}

const Login = () => {
    const navigate = useNavigate()
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
        const payload = {
            email: getValues("email"),
            password: getValues("password")
        }
        
        await loginUser(payload)
            .then((response) => {
                if (response && response.data.token) {
                    setCredentials(response)
                    navigate("/homepage")
                } else {
                    console.error("Login failed: No token received")
                }
            })
            .catch((error) => console.error(error))
    }

    return ( 
        <LayoutAuth
            title="Masuk atau buat akun untuk memulai"
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
                        error={errors}
                    />
                ))}
                <CustomButton 
                    text="Masuk"
                    type="submit"
                />
            </form>
        </LayoutAuth>
    );
}
 
export default Login;