import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function (_, { rejectWithValue }) {
    try {
      const res = await fetch("http://localhost:3030/people");

      if (!res.ok) {
        throw new Error("Server Error!");
      }

      const users = await res.json();

      return users;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// ВОТ ЕБАНЫЙ ЗАПРОС
export const signUp = createAsyncThunk(
  "users/signUp",
  async function (
    { name, login, password, date, gender, file },
    { rejectWithValue }
  ) {
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      console.log(formData);
      const res = await fetch("http://localhost:3030/people/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: formData
      });

      if (!res.ok) {
        throw new Error("Server Error!");
      }

      const data = await res.json();

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "users/signIn",
  async function ({ login, password }, { rejectWithValue }) {
    try {
      const res = await fetch("http://localhost:3030/people/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: login,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Server Error!");
      }

      // console.log(res);
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    token: localStorage.getItem("token"),
    currentUserId: localStorage.getItem("userId")
  },
  reducers: {
    logOut(state, action) {
      console.log(12121212);
      localStorage.clear();
      state.token = null;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    // вход
    [signIn.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload.token;
      state.currentUserId = action.payload.id;
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { logOut } = usersSlice.actions;

export default usersSlice.reducer;
