import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authenticateUser = createAsyncThunk(
    "user/authenticateUser",
    async ({ token, role }, { rejectWithValue }) => {
        if (!token) {
            return rejectWithValue("Unauthorized: No token provided");
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${role}/authenticate`, {
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
    role: null,
    isLoggedIn: null, // null indicates that the authentication status is not yet determined
};

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        updateLoginStatus: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
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
            .addCase(authenticateUser.rejected, (state) => {
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

export const { setUser, updateUser, logoutUser, updateLoginStatus } = counterSlice.actions;

export default counterSlice.reducer;