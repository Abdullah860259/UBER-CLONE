import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authenticateUser = createAsyncThunk(
    "user/authenticateUser",
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/authenticate`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.status !== 200) {
                throw new Error(response.data.message || "Authentication failed");
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(authenticateUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(authenticateUser.rejected, (state, action) => {
                state.user = null;
                state.token = null;
                state.isLoggedIn = false;
            })
            .addCase(authenticateUser.pending, (state) => {
                state.user = null;
                state.token = null;
                state.isLoggedIn = false;
            })
    }
});

export const { setUser, updateUser, logoutUser } = counterSlice.actions;

export default counterSlice.reducer;