import { createApi } from '@reduxjs/toolkit/query/react'
import { api } from './services/interceptor'

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, body, params, headers }) => {
    try {
      const result = await api({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export const API = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://take-home-test-api.nutech-integrasi.com',
  }),
  endpoints: () => ({}),
})