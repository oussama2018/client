import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
export const signup=createAsyncThunk(
    "/api/register",async(info,rejectWithValue)=>{
        try{
                const res=await axios.post("/user/register",info)
                return res.data
        }
        catch(errors){
                return rejectWithValue(errors.response.data.msg)
        }
    }
)

// export const signup = createAsyncThunk(
//     "user/signup", async (info, rejectWithValue) => {
//         try {
//             const res = await axios.post("/register", info)
//             return res.data

//         } catch (error) {
//             return rejectWithValue(error.response.data.msg)
//             //  console.log(error.response.data.msg)
//         }
//     }
// )
export const signin = createAsyncThunk(
    "/api/login",
    async (info, { rejectWithValue }) => {
      try {
        const res = await axios.post("/user/login", info);
        return res.data;
      } catch (errors) {
        if (errors.response && errors.response.status === 400) {
          // Handle the 400 Bad Request error
          return rejectWithValue(errors.response.data);
        } else {
          // Handle other errors
          return rejectWithValue("An error occurred during login.");
        }
      }
    }
  );
export const getAllBooks = createAsyncThunk(
    "admin/getAllBooks",
    async (info, { rejectWithValue,dispatch }) => {
      try {
        const res = await axios.get("/user/getAllBooks");
        return res.data;
      } catch (errors) {
        return rejectWithValue(errors.response.data.msg);
      }
    }
  );

  export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
      try {
        const res = await axios.delete(`/user/delete/${userId}`);
        return res.data;
      } catch (errors) {
        return rejectWithValue(errors.response.data.msg);
      }
    }
  );
  



const userSlice=createSlice({
    name:"user",
    initialState:{
        userdata:[],
        posts: [],
        isLoading:false,
        token:localStorage.getItem("token")||null,
        isAuth:Boolean(localStorage.getItem("isAuth")) || false,
        error: null
    },
    reducers:{
        logout:(state)=>{
            state.isAuth=false 
            state.token=null
            localStorage.removeItem("isAuth")
            localStorage.removeItem("token")
        }
    },
    extraReducers:{
        [signup.pending]:(state)=>{
            state.isLoading=true},
        [signup.fulfilled]:(state,action)=>{
        state.isLoading=false
        state.isAuth=true
        state.userdata=action.payload.user
        state.token=action.payload.token
        localStorage.setItem("token",state.token)
        localStorage.setItem("isAuth",state.isAuth)
        localStorage.setItem("userdata",state.userdata); // Save userdata as string



        

        },
        [signup.rejected]:(state, action)=>{
        state.isLoading=false
        state.isAuth=false
        state.token=null
        state.error = action.payload
        },
        [signin.pending]:(state)=>{
        state.isLoading=true},
        [signin.fulfilled]:(state,action)=>{
            console.log("Received user data:", action.payload.user);
        state.isAuth=true
        state.isLoading=false
        state.userdata=action.payload.user
        console.log(state.userdata)
        state.token=action.payload.token
        localStorage.setItem("token",state.token)
        localStorage.setItem("isAuth",state.isAuth)
        localStorage.setItem("userdata",state.userdata);
        },
        [signin.rejected]:(state, action)=>{
        state.isLoading=false
        state.isAuth=false
        state.token=null
        state.error = action.payload;
        },

        [getAllBooks.pending]: (state) => {
            state.isLoading = true;
          },
          [getAllBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.posts = action.payload; 
            console.log(state.posts);
          },
          [getAllBooks.rejected]: (state) => {
            state.isLoading = false;
          },
    }
})

export default userSlice.reducer
export const {logout,setUserdata}=userSlice.actions
