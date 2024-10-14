import axios from "axios"
import { ENDPOINTS } from "../constants/endpoints"
import { api, apiAuth } from "./interceptor"
import { getAccessToken } from "../constants/storage"
import { message } from "antd"

export const registerUser = async ( body ) => {
    return await apiAuth.post(ENDPOINTS.POST.REGISTRATION, body)
    .then((response) => {
        const body = response.data
        return body
    })
    .catch((error) => {
        return error.response
    })
}

export const loginUser = async (credential) => {
    return await apiAuth.post(ENDPOINTS.POST.LOGIN, credential)
    .then((response) => {
        const body = response.data
        return body
    })
    .catch((error) => {
        return error.response
    })
}

export const updateUser = async (profile) => {
    return await api.put(ENDPOINTS.PUT.PROFILE, profile)
    .then((response) => {
        const body = response.data
        return body
    })
    .catch((error) => {
        return error.response
    })
}

export const customUploadPic = async ({ file, onSuccess, onError }) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await axios.put(
            `https://take-home-test-api.nutech-integrasi.com${ENDPOINTS.PUT.PROFILE_PIC}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        message.success(`${file.name} uploaded successfully`)
        onSuccess(response.data, file)
    } catch (error) {
        console.error(error)
        message.error(`${file.name} upload failed.`)
        onError(error)
    }
}