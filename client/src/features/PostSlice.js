import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const getPosts=createAsyncThunk("posts/getPosts",async()=>{
    try{
        const response=await axios.get("http://localhost:5000/showPosts");
        return response.data;
    }
    catch(error){
        console.log(error);
    }
});

export const savePost=createAsyncThunk("posts/savePost",async(pdata)=>{
    try{
        const response=await axios.post("http://localhost:5000/savePost",pdata);
        return response.data.message;
    }
    catch(error){
        console.log(error);
    }
});

const initVal={
    posts:[],
    message:"",
    isLoading:false,
    isSuccess:false,
    isError:false
}

export const PostSlice=createSlice({
    name:"posts",
    initialState:initVal,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(savePost.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(savePost.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.message=action.payload;
        })
        .addCase(savePost.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
        })
        .addCase(getPosts.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(getPosts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.posts=action.payload;
        })
        .addCase(getPosts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
        })
    }
});
export default PostSlice.reducer;