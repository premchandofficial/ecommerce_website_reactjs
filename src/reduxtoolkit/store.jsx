import { configureStore } from '@reduxjs/toolkit'
import stateSlice from './createSlice'

export const store = configureStore({
  reducer: {
      myStoreData:stateSlice,
  },
})