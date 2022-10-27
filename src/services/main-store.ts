import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../assets/API';
import { useAppDispatch } from './config-store';
import { TNews } from './types';

type TInitState = {
    news: Array<TNews>,
    ids: Array<number>,
    comments: Array<any>,
    status: string | null,
};

const initialState: TInitState = {
    news: [],
    ids: null,
    comments: [],
    status: null,
};

export const fetchData = createAsyncThunk('mainStore/fetchData', async () => {
    const res = await fetch(API);
    const data = await res.json();
    return data
})

export const getNews = createAsyncThunk('mainStore/getNews', async (id: number) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    const data = await res.json();
    return data
})


export const getComments = createAsyncThunk('mainStore/getComments', async (id: number) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    const data = await res.json();
    return data
})

const mainStore = createSlice({
    name: 'mainStore',
    initialState: initialState,
    reducers: {
        cleanStore(state, action) {
            state.news = [];
            state.ids = null;
            state.status = null;
        },
        cleanAllComments(state, action) {
            state.comments = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.status = 'pending';
        }),
            builder.addCase(fetchData.rejected, (state, action) => {
                state.status = 'rejected';
            }),
            builder.addCase(fetchData.fulfilled, (state, action: any) => {
                state.status = 'fulfilled';
                const data = action.payload;
                let indexInArray: number;
                let newItems: Array<number>;

                state.ids == null ? (
                    state.ids = data.slice(0, 100)
                ) : (
                    indexInArray = data.findIndex(() => state.ids[0]),
                    indexInArray == 0 ? (
                        state.ids
                    ) : (
                        newItems = data.slice(0, indexInArray),
                        //@ts-ignore
                        state.ids.unshift(newItems),
                        state.ids.slice(0, 100)
                    )
                )
            }),

            builder.addCase(getNews.pending, (state, action) => {
                state.status = 'pending';
            }),
            builder.addCase(getNews.rejected, (state, action) => {
                state.status = 'rejected';
            }),
            builder.addCase(getNews.fulfilled, (state, action: any) => {
                state.status = 'fulfilled';
                state.news.push(action.payload)
            }),

            builder.addCase(getComments.pending, (state, action) => {
                state.status = 'pending';
            }),
            builder.addCase(getComments.rejected, (state, action) => {
                state.status = 'rejected';
            }),
            builder.addCase(getComments.fulfilled, (state, action: any) => {
                state.status = 'fulfilled';
                state.comments.push(action.payload)
            })
    },
})

export default mainStore.reducer;
export const { cleanStore, cleanAllComments } = mainStore.actions;