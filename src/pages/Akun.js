import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Navbar from "../components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserScheam } from "../utils/validation/auth";
import { useGetUserPropertyQuery } from "../utils/services/general";
import { useEffect, useState } from "react";
import { updateUser } from "../utils/services/auth";
import toast from "react-hot-toast";
import { removeAccessToken } from "../utils/constants/storage";

const Akun = () => {
    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useGetUserPropertyQuery();
    const [disabled, setDisabled] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(EditUserScheam),
        defaultValues: {
            first_name: '',
            last_name: ''
        }
    });

    useEffect(() => {
        if (userData) {
            reset({
                first_name: userData.data.first_name,
                last_name: userData.data.last_name,
            });
        }
    }, [reset, userData]);

    const onSubmit = async () => {
        const payload = {
            first_name: getValues("first_name"),
            last_name: getValues("last_name")
        };

        await updateUser(payload)
            .then((res) => {
                toast.success(res.message);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    };

    if (isUserDataLoading) return <p>Loading...</p>;
    if (userDataError) return <p>Error loading user data</p>;

    return ( 
        <div className="flex flex-col h-screen">
            <Navbar />
            <hr className="mb-6"/>
            <div className="flex flex-col justify-center items-center w-full">
                <img src="/profile_pic.png" alt="profile_pic" />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center mt-8 space-y-6 w-full"
                >
                    <CustomInput 
                        register={register}
                        name="email"
                        label="Email"
                        disabled
                        error={errors.email}
                        value={userData.data.email}
                    />
                    <CustomInput 
                        register={register}
                        name="first_name"
                        label="First Name"
                        disabled={disabled}
                        error={errors.first_name}
                    />
                    <CustomInput 
                        register={register}
                        name="last_name"
                        label="Last Name"
                        disabled={disabled}
                        error={errors.last_name}
                    />
                    {disabled ? (
                        <div className="flex flex-col mt-4 space-y-3 w-full items-center">
                            <CustomButton 
                                text="Edit Profile"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setDisabled(false)
                                }}
                            />
                            <CustomButton 
                                text="Logout"
                                onClick={() => {
                                    removeAccessToken()
                                    window.location.reload()
                                }}
                            />
                        </div>   
                    ) : (
                        <div className="flex flex-col mt-4 space-y-3 w-full items-center">
                            <CustomButton 
                                text="Simpan"
                                type="submit"
                            />
                            <CustomButton 
                                text="Batal"
                                onClick={() => {
                                    setDisabled(true);
                                }}
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Akun;
