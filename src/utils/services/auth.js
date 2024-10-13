import { ENDPOINTS } from "../constants/endpoints"
import { api, apiAuth } from "./interceptor"

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