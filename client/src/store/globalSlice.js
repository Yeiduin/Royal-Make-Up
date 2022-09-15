import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchName: "",
};

export const globalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    searchByName: (state, { payload }) => {
      state.searchName = payload;
      console.log(state.searchName)
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchByName } = globalSlice.actions;
