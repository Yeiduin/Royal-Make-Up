import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creation: 0,
};

export const createProductSlice = createSlice({
  name: "createProduct",
  initialState,

  reducers: {
    createproduct: (state, { payload }) => {
      state.creation = state.creation + 1;
    },
  },
});
export const { createproduct } = createProductSlice.actions