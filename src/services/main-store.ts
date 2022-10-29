import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../assets/API';
import { TComment, TNews } from './types';

type TInitState = {
    news: Array<TNews>,
    ids: Array<number>,
    comments: Array<TComment>,
    commentsKids: Array<TComment>,
    status: string | null,
    newsStatus: string | null,
    commentsStatus: string | null,
    commentsKidStatus: string | null,
    commentsNumber: number,
};

const initialState: TInitState = {
    news: [],
    ids: null,
    comments: [],
    commentsKids: [],
    status: null,
    newsStatus: null,
    commentsStatus: null,
    commentsKidStatus: null,
    commentsNumber: 0,
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

export const getKidComments = createAsyncThunk('mainStore/getKidComments', async (id: number) => {
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
        },
        cleanComments(state, action) {
            state.comments = [];
            state.commentsKids = [];
            state.commentsNumber = 0;
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
                state.newsStatus = 'pending';
            }),
            builder.addCase(getNews.rejected, (state, action) => {
                state.newsStatus = 'rejected';
            }),
            builder.addCase(getNews.fulfilled, (state, action: any) => {
                state.newsStatus = 'fulfilled';
                state.news.push(action.payload)
            }),

            builder.addCase(getComments.pending, (state, action) => {
                state.commentsStatus = 'pending';
            }),
            builder.addCase(getComments.rejected, (state, action) => {
                state.commentsStatus = 'rejected';
            }),
            builder.addCase(getComments.fulfilled, (state, action: any) => {
                state.commentsStatus = 'fulfilled';
                (state.comments.some(kid => kid.id == action.payload.id)) ?
                    state.comments
                    :
                    state.comments.push(action.payload);
                state.commentsNumber = state.comments.length + state.comments.length;
            }),

            builder.addCase(getKidComments.pending, (state, action) => {
                state.commentsKidStatus = 'pending';
            }),
            builder.addCase(getKidComments.rejected, (state, action) => {
                state.commentsKidStatus = 'rejected';
            }),
            builder.addCase(getKidComments.fulfilled, (state, action: any) => {
                state.commentsKidStatus = 'fulfilled';

                (state.commentsKids.some(kid => kid.id == action.payload.id)) ?
                    state.commentsKids
                    :
                    state.commentsKids.push(action.payload);

                state.commentsNumber = state.commentsKids.length + state.comments.length;
            })
    },
})

export default mainStore.reducer;
export const { cleanStore, cleanComments } = mainStore.actions;