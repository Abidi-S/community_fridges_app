// 
import { configureStore } from '@reduxjs/toolkit'

import fridgesReducer from '../features/fridges/fridgesSlice'
import stocksReducer from '../features/stocks/stocksSlice'

//Exports fridgeReducer and stocksReducer unified
export default configureStore({
  reducer: {
    fridges: fridgesReducer,
    stocks: stocksReducer,
  },
})
