import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = `https://jsonplaceholder.typicode.com/users`;


const initialState = {
    users: [],
    status: 'idle',
    error: null,
}


export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const response  = await axios.get(USERS_URL);
    const data = await response.data;
    return data;
})




export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, {payload}) => {
                state.users = payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUsers.rejected, (state, {error}) => {
                state.status = 'error';
                state.error = error.message
            })
    }
});

export const allUsers = (store) => store.users.users;

export default usersSlice.reducer;