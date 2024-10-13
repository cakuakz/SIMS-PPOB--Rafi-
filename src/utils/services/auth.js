import { ENDPOINTS } from "../constants/endpoints"
import { apiAuth } from "./interceptor"

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