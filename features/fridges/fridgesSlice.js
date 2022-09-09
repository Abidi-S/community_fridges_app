//

//import { sub } from "date-fns";
import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";
//import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "../../firebaseConfig";
import { useSelector } from "react-redux";


//initial state set prior to being fed
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

//fetch request for fridges, with action "fridges/fetchFridges"
export const fetchFridges = createAsyncThunk("fridges/fetchFridges", async () => {

  //async grab for "fridges/addNewFridge" action
  let fridges = await firebase.database().ref("fridges/addNewFridge").get();

  //Returns all fridges being stored
  let res =  Object.values(fridges.val()).map(f => f.fridge);

  return res
});

//adding new fridge to database, with "fridges/addNewFridge" action
export const addNewFridge = createAsyncThunk(
  "fridges/addNewFridge",

  // The payload creator receives the partial `{title, content, user}` object
  async (fridgeNum) => {

    // We send the initial data to firebase server
    console.log(fridgeNum, "firebase app name");
    const response = await firebase
      .database()
      .ref("fridges/addNewFridge")
      .push({ fridge: fridgeNum });

    // The response includes the complete post object, including unique ID
    return response.fridge;
  }
);


const fridgesSlice = createSlice({
  name: "fridges",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFridges.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchFridges.fulfilled]: (state, action) => {
      state.status = "succeeded";
      // Save all fetched fridges to the local state array
      state.data = action.payload;
    },
    [fetchFridges.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewFridge.fulfilled]: (state, action) => {
      // We can directly add the new fridge object to our data array
      state.data.push(action.meta.arg);
    },
  },
});

//export const { addNewFridge } = fridgesSlice.actions;

export default fridgesSlice.reducer;
export const selectAllFridges = (state) => state.fridges.data;

export const selectFridgeById = (state, fridgeId) =>
  state.fridges.data.find((fridge) => fridge.id === fridgeId);
