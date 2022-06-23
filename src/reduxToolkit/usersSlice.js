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

export const signUp = createAsyncThunk(
  "users/signUp",
  async function (
    { name, login, password, date, gender },
    { rejectWithValue }
  ) {
    try {
      const res = await fetch("http://localhost:3030/people/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: login,
          password,
          date,
          gender,
        }),
      });

      if (!res.ok) {
        throw new Error("Server Error!");
      }

      const data = await res.json();
      console.log(data);

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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Server Error!");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.id);

      return data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const changeImage = createAsyncThunk(
  "users/changeImage",
  async function ({ image }, { rejectWithValue, getState }) {
    const state = getState();

    const formData = new FormData();
    formData.set("image", image);

    console.log(formData);
    try {
      const res = await fetch(`http://localhost:3030/people/image/${state.users.currentUserId}`, {
        method: "PATCH",
        body: formData,
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

export const changeName = createAsyncThunk(
  "users/changeName",
  async function ({ name }, { rejectWithValue, getState }) {
    const state = getState();

    try {
      const res = await fetch("http://localhost:3030/people/name", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.users.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
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

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async function ({ password }, { rejectWithValue, getState }) {
    const state = getState();

    try {
      const res = await fetch("http://localhost:3030/people/password", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${state.users.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
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

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    token: localStorage.getItem("token"),
    currentUserId: localStorage.getItem("userId"),
  },
  reducers: {
    logOut(state, action) {
      localStorage.clear();
      state.token = null;
      state.currentUserId = "";
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

    // регистрация
    [signUp.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.users.push(action.payload);
      state.currentUserId = action.payload.id;
    },
    [signUp.rejected]: (state, action) => {
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

    // смена имени
    [changeName.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [changeName.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.users = state.users.map((user) => {
        if (user._id === action.payload._id) {
          user.name = action.payload.name;
          return user;
        }
        return user;
      });
    },
    [changeName.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { logOut } = usersSlice.actions;

export default usersSlice.reducer;