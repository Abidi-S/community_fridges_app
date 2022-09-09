//

//import { sub } from "date-fns";
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";
//import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "../../firebaseConfig";
import { useSelector } from "react-redux";

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig);
// }

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  let stocks = await firebase.database().ref("stocks/addNewStock").get();
  let res = Object.values(stocks.val()).map((f) => f.stock);
  console.log("stock res", res);
  return res;
});

export const addNewStock = createAsyncThunk(
  "stocks/addNewStock",
  // The payload creator receives the partial `{title, content, user}` object
  async (stockType) => {
    // We send the initial data to firebase server
    console.log(stockType, "firebase app name");
    const response = await firebase
      .database()
      .ref("stocks/addNewStock")
      .push({ stock: stockType });
    // The response includes the complete post object, including unique ID
    return response.stock;
  }
);
const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStocks.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchStocks.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      state.data = action.payload;
    },
    [fetchStocks.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //omit posts loading reducers
    [addNewStock.fulfilled]: (state, action) => {
      // We can directly add the new stock object to our data array
      state.data.push(action.meta.arg);
    },
  },
});

//export const { addNewStock } = stocksSlice.actions;

export default stocksSlice.reducer;
export const selectAllStocks = (state) => state.stocks.data;

export const selectStockById = (state, stockId) =>
  state.stocks.data.find((stock) => stock.id === stockId);
