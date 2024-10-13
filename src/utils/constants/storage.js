export const getCredentials = () => {
    return localStorage.getItem('accessToken')
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken')
}

export const setCredentials = (credential) => {
    localStorage.setItem('accessToken', credential.data.token)
}

export const removeAccessToken = () => {
    localStorage.removeItem('accessToken')
};

export const isLoggedIn = () => {
    const token = getAccessToken()
    return Boolean(token)
}