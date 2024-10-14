import { API } from "../api";
import { ENDPOINTS } from "../constants/endpoints";

const generalAPI = API.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => ({
                url: ENDPOINTS.GET.SERVICES,
                method: 'get',
            })
        }),
        getBanner: builder.query({
            query: () => ({
                url: ENDPOINTS.GET.BANNER,
                method: 'get'
            })
        }),
        getUserProperty: builder.query({
            query: () => ({
                url: ENDPOINTS.GET.PROFILE,
                method: 'get'
            })
        }),
        putImageFile: builder.mutation({
            query: (imgFile) => {
                const formData = new FormData();
                formData.append('file', imgFile); 

                return {
                    url: ENDPOINTS.PUT.PROFILE_PIC,
                    method: 'put',
                    body: formData,
                }
            }
        })
    })
})

export const { useGetServicesQuery, useGetBannerQuery, useGetUserPropertyQuery, usePutImageFileMutation } = generalAPI