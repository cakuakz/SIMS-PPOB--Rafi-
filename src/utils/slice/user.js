import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
      data: {
        email: '',
        first_name: '',
        last_name: '',
        profile_image: '',
        balance: 0
      },
    },
    reducers: {
      setUserData: (state, action) => {
        state.data = {
            ...state.data, 
            ...action.payload
        }
      },
      setBalanceData: (state, action) => {
        state.data.balance = action.payload
      },
      clearUserData: (state) => {
        state.data = {
          email: '',
          first_name: '',
          last_name: '',
          profile_image: '',
          balance: 0
        }
      },
    },
  })
  
  export const { setUserData, clearUserData, setBalanceData } = userSlice.actions
  export default userSlice