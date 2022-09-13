import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [],
    details: {},
    actualPage: 1,
    next: false,
    errorMessage: null,
    status: "ddd",

}

export const landingPageSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        loadPagination: (state, { payload }) => {

            state.list = payload.list;
            state.next = payload.next;
        }
    }
})

// Action creators are generated for each case reducer function
export const { loadPagination } = landingPageSlice.actions
