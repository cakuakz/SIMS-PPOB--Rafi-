import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
      data: {
        service_code: '',
        service_name: '',
        service_tariff: 0
      },
    },
    reducers: {
      setTransactionData: (state, action) => {
        state.data = {
            ...state.data, 
            ...action.payload
        }
      },
      clearTransactionData: (state) => {
        state.data = {
            service_code: '',
            service_name: '',
            service_tariff: 0
        }
      },
    },
  })
  
  export const { setTransactionData, clearTransactionData } = transactionSlice.actions
  export default transactionSlice