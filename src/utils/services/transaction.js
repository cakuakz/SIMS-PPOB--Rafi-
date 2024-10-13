import { API } from "../api";
import { ENDPOINTS } from "../constants/endpoints";

const transactionAPI = API.injectEndpoints({
    endpoints: (builder) => ({
        getBalance: builder.query({
            query: () => ({
                url: ENDPOINTS.GET.BALANCE,
                method: 'get'
            })
        }),
        getTransactionHistory: builder.query({
            query: ({ offset = 0, limit = 5 }) => ({
              url: ENDPOINTS.GET.TRANSACTION_HISTORY,
              method: 'GET',
              params: {
                offset,
                limit,
              },
            }),
        }),
        postTopupBalance: builder.mutation({
            query: (payload) => ({
                url: ENDPOINTS.POST.TOPUP,
                method: 'post',
                body: payload
            })
        }),
        postServicePayment: builder.mutation({
            query: (payload) => ({
                url: ENDPOINTS.POST.TRANSACTION,
                method: 'post',
                body: payload
            })
        })
    })
})

export const { useGetBalanceQuery, usePostTopupBalanceMutation, usePostServicePaymentMutation, useGetTransactionHistoryQuery } = transactionAPI