import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const initialState ={
    popularMovies,
    summaryDetailed:{},
    isLoading : false,
    error:null
}

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers:{},
    extraReducers: (builder) => {

    }
})

export const selectMovie = (state) => state.data.data;

export default movieSlice.reducer;