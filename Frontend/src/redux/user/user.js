import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isLoggedIn: false
};

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        }
    },
});

export const { setUser, updateUser, logoutUser } = counterSlice.actions;

export default counterSlice.reducer;