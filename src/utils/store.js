import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { API } from "./api";
import userSlice from "./slice/user";
import transactionSlice from "./slice/transaction";

const persistConfig = {
  key: 'transaction',
  storage,
}

const persistedTransactionReducer = persistReducer(persistConfig, transactionSlice.reducer)
const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer)

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    transaction: persistedTransactionReducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(API.middleware),
})

export const persistor = persistStore(store)

export default store
