import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../assets/API';

export type TItem = {
    img: string,
    title: string,
    id: string,
    price: number,
    rate: number,
    wireless: boolean;
    number: number,
};

export type TInitState = {
    title: string | null,
    link: string | null,
    rating: number | null,
    author: string | null,
    date: string | null,
    counter: number | null,
    comments: Array<TInitState> | null,

    status: string | null,
};

export const initialState: TInitState = {
    title: null,
    link: null,
    rating: null,
    author: null,
    date: null,
    counter: null,
    comments: null,

    status: null,
};

export const fetchData = createAsyncThunk('users/fetchAll', async () => {
    const response = await fetch(API);
    return response.json
})


const mainStore = createSlice({
    name: 'mainStore',
    initialState: initialState,
    reducers: {
        getFeed(state, action) {
            state.comments = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.status = 'pending';
        }),
            builder.addCase(fetchData.rejected, (state, action) => {
                state.status = 'rejected';
            }),
            builder.addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'fulfilled';
            })

    },
})

export default mainStore.reducer;
export const { } = mainStore.actions;