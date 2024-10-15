import { useForm } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Navbar from "../components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserScheam } from "../utils/validation/auth";
import { useGetUserPropertyQuery } from "../utils/services/general";
import { useEffect, useState } from "react";
import { customUploadPic, updateUser } from "../utils/services/auth";
import toast from "react-hot-toast";
import { removeAccessToken } from "../utils/constants/storage";
import { FaPen } from "react-icons/fa";
import { Upload, message } from "antd";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { capitalCase } from "text-case";
import { LANGUAGE } from "../utils/constants/language";

const Akun = () => {
    const { data: userData, error: userDataError, isLoading: isUserDataLoading } = useGetUserPropertyQuery()
    const [disabled, setDisabled] = useState(true)
    const profPic = userData && userData.data && userData.data.profile_image
    const firstName = userData && userData.data && userData.data.first_name
    const lastName = userData && userData.data && userData.data.last_name

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error(capitalCase(LANGUAGE.VALIDATION.IMAGE_SIZE))
            return Upload.LIST_IGNORE
        }
    
        const isLt100KB = file.size / 1024 < 100
        if (!isLt100KB) {
            message.error(capitalCase(LANGUAGE.VALIDATION.IMAGE_FORMAT))
            return Upload.LIST_IGNORE
        }
    
        return true
    }

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

    const props = {
        customRequest: customUploadPic,
        showUploadList: false,
        beforeUpload: beforeUpload,
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
        },
    }

    useEffect(() => {
        if (userData) {
            reset({
                first_name: userData.data.first_name,
                last_name: userData.data.last_name,
            });
        }
    }, [reset, userData])
    

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
        <div className="flex flex-col h-screen w-full">
            <Navbar />
            <hr className="mb-6"/>
            <div className="flex flex-col justify-center items-center w-full">
                <img src={profPic} alt="profile_pic" className="w-28 rounded-full"/>
                <Upload
                    {...props}
                    className="relative bg-white left-12 bottom-7 rounded-full border border-slate-400 px-2 py-1 cursor-pointer"
                >
                    <FaPen className="text-slate-600" />
                </Upload>
                <h1 className="text-2xl font-semibold">{`${firstName} ${lastName}`}</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col items-center mt-8 space-y-6 w-full xl:px-[400px] px-6"
                >
                    <div className="flex flex-col justify-start mb-3 w-full">
                        <p className="text-black font-medium text-md mb-2">{capitalCase(LANGUAGE.INPUT.PLACEHOLDER.EMAIL)}</p>
                        <CustomInput 
                            register={register}
                            name="email"
                            label={capitalCase(LANGUAGE.INPUT.PLACEHOLDER.EMAIL)}
                            disabled
                            error={errors.email}
                            logo={<MdOutlineAlternateEmail />}
                            value={userData.data.email}
                            width="full"
                        />
                    </div>
                    <div className="flex flex-col justify-start mb-3 w-full">
                        <p className="text-black font-medium text-md mb-2">{capitalCase(LANGUAGE.INPUT.PLACEHOLDER.FIRST_NAME)}</p>
                        <CustomInput 
                            register={register}
                            name="first_name"
                            label={capitalCase(LANGUAGE.INPUT.PLACEHOLDER.FIRST_NAME)}
                            disabled={disabled}
                            logo={<FaRegUser />}
                            error={errors.first_name}
                            width="full"
                        />
                    </div>
                    <div className="flex flex-col justify-start mb-3 w-full">
                        <p className="text-black font-medium text-md mb-2">{capitalCase(LANGUAGE.INPUT.PLACEHOLDER.LAST_NAME)}</p>
                        <CustomInput 
                            register={register}
                            name="last_name"
                            label={capitalCase(LANGUAGE.INPUT.PLACEHOLDER.LAST_NAME)}
                            disabled={disabled}
                            logo={<FaRegUser />}
                            error={errors.last_name}
                            width="full"
                        />
                    </div>
                    {disabled ? (
                        <div className="flex flex-col mt-4 space-y-3 w-full items-center">
                            <CustomButton 
                                text={capitalCase(LANGUAGE.BUTTON.ACTION_TEXT.EDIT_PROFILE)}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setDisabled(false)
                                }}
                                classname="border-2 border-red-600 bg-white text-red-600 rounded py-2 w-full"
                            />
                            <CustomButton 
                                text={capitalCase(LANGUAGE.BUTTON.ACTION_TEXT.LOGOUT)}
                                onClick={() => {
                                    removeAccessToken()
                                    window.location.reload()
                                }}
                                width="full"
                            />
                        </div>   
                    ) : (
                        <div className="flex flex-col mt-4 space-y-3 w-full items-center">
                            <CustomButton 
                                text={capitalCase(LANGUAGE.BUTTON.ACTION_TEXT.SIMPAN)}
                                type="submit"
                                classname="border-2 border-red-600 bg-white text-red-600 w-full rounded py-2"
                            />
                            <CustomButton 
                                text={capitalCase(LANGUAGE.BUTTON.ACTION_TEXT.BATAL)}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setDisabled(true);
                                }}
                                width="full"
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Akun;
