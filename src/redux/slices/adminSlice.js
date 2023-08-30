import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signin = createAsyncThunk(
  "admin/signin",
  async (info, { rejectWithValue }) => {
    try {
      const res = await axios.post("/admin/login", info);
      return res.data;
    } catch (errors) {
      return rejectWithValue(errors.response.data.msg);
    }
  }
);

export const getAllBooks = createAsyncThunk(
  "admin/getAllBooks",
  async (info, { rejectWithValue,dispatch }) => {
    try {
      const res = await axios.get("/admin/Book/getAllBooks");
      console.log(res.data)
      return res.data;
    } catch (errors) {
      return rejectWithValue(errors.response.data.msg);
    }
  }
);

export const deleteBook = createAsyncThunk(
    "admin/deleteBook",
    async (bookId, { rejectWithValue, dispatch }) => {
      try {
        await axios.delete(`/admin/Book/deleteBook/${bookId}`);
        dispatch(getAllBooks())
      } catch (errors) {
        return rejectWithValue(errors.response.data.msg);
      }
    }
  );
  export const addBook = createAsyncThunk(
    "admin/addBook",
    async (newBookInfo, { rejectWithValue, dispatch }) => {
      try {
        const res = await axios.post("/admin/Book/addBook", newBookInfo);
        return res.data; 
      } catch (errors) {
        return rejectWithValue(errors.response.data.msg);
      }
    }
  );
  export const updateBook = createAsyncThunk(
    "admin/updateBook",
    async ({ bookId, updatedBookInfo }, { rejectWithValue, dispatch }) => {
      try {
        const res = await axios.put(`/admin/Book/updateBook/${bookId}`, updatedBookInfo);
        console.log(bookId)
        return { bookId, updatedBookInfo: res.data }; 
      } catch (errors) {
        return rejectWithValue(errors.response.data.msg);
      }
    }
  );

  export const getAllUsers = createAsyncThunk(
    "admin/getAllUsers",
    async (_, { rejectWithValue }) => {
      try {
        const res = await axios.get("/admin/getAllUsers"); 
        return res.data;
      } catch (errors) {
        return rejectWithValue(errors.response.data.msg);
      }
    }
  );
  
  export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, { rejectWithValue, dispatch }) => {
      try {
        await axios.delete(`/admin/deleteUser/${userId}`);
        
        dispatch(getAllUsers());
      } catch (errors) {
        return rejectWithValue(errors.response.data.msg);
      }
    }
  );
  

//   export const addBook = createAsyncThunk(
//     "admin/addBook",
//     async (newBookInfo, { rejectWithValue, dispatch }) => {
//       try {
//         const res = await axios.post("/admin/Book/addBook", newBookInfo);
//         return res.data; // Assuming the server returns the newly added book data
//       } catch (errors) {
//         return rejectWithValue(errors.response.data.msg);
//       }
//     }
//   );
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admindata: [],
    posts: [], 
    isLoading: false,
    token: localStorage.getItem("token") || null,
    isAuth: Boolean(localStorage.getItem("isAuth")) || false,
    users: [],
  },
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem("isAuth");
      localStorage.removeItem("token");
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.admindata = action.payload.admin;
      state.token = action.payload.token;
      localStorage.setItem("token", state.token);
      localStorage.setItem("isAuth", state.isAuth);
    },
    [signin.rejected]: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
    },
    [getAllBooks.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.books; 
      console.log(state.posts);
    },
    [getAllBooks.rejected]: (state) => {
      state.isLoading = false;
    },

    [deleteBook.pending]: (state) => {
        state.isLoading = true;
      },
      [deleteBook.fulfilled]: (state, action) => {
        state.isLoading = false;
      },
      [deleteBook.rejected]: (state) => {
        state.isLoading = false;
      },
      [addBook.pending]: (state) => {
        state.isLoading = true;
      },
      [addBook.fulfilled]: (state, action) => {
        state.isLoading = false;
        // You can update your state to include the newly added book
        state.posts.push(action.payload); // Assuming payload contains the new book data
      },
      [addBook.rejected]: (state) => {
        state.isLoading = false;
      },
      [updateBook.pending]: (state) => {
        state.isLoading = true;
      },
      [updateBook.fulfilled]: (state, action) => {
        state.isLoading = false;
        const { bookId, updatedBookInfo } = action.payload;
      console.log(action.payload)
        // Create a new array with the updated book information
        const updatedPosts = state.posts.map(book => {
          if (book._id === bookId) {
            return { ...book, ...updatedBookInfo };
          }
          return book;
        });
      
        // Update the state with the new array
        state.posts = updatedPosts;
    
      },
      
      [updateBook.rejected]: (state) => {
        state.isLoading = false;
      
    },

    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users; // Assuming the payload contains the list of users
    },
    [getAllUsers.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      // Optionally, you can remove the deleted user from the users array
      const userId = action.meta.arg;
      state.users = state.users.filter((user) => user._id !== userId);
    },
    [deleteUser.rejected]: (state) => {
      state.isLoading = false;
    },
    
    //   [addBook.pending]: (state) => {
    //     state.isLoading = true;
    //   },
    //   [addBook.fulfilled]: (state, action) => {
    //     state.isLoading = false;
    //     // You can update your state to include the newly added book
    //     state.posts.push(action.payload); // Assuming payload contains the new book data
    //   },
    //   [addBook.rejected]: (state) => {
    //     state.isLoading = false;
    //   },
    
  },
});

export default adminSlice.reducer;
export const { logout} = adminSlice.actions;

