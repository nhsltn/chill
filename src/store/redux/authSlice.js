import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAllUsers, createUser } from "../../services/api/user";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ username, password, navigate }, { rejectWithValue }) => {
    try {
      const res = await fetchAllUsers();
      const exists = res.data.find((u) => u.username === username);
      if (exists) {
        toast.error("Username sudah terpakai, gunakan username lain!");
        return rejectWithValue("Username taken");
      }
      await createUser({ username, password });
      toast.success("Pendaftaran sukses! Silakan Login.");
      navigate("/login");
    } catch {
      toast.error("Pendaftaran gagal, coba lagi!");
      return rejectWithValue("Register failed");
    }
  },
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password, navigate }, { rejectWithValue }) => {
    try {
      const res = await fetchAllUsers();
      const match = res.data.find(
        (u) => u.username === username && u.password === password,
      );
      if (!match) {
        toast.error("Username atau password salah!");
        return rejectWithValue("Invalid credentials");
      }
      toast.success(`Welcome, ${match.username}!`);
      navigate("/");
      return match;
    } catch {
      toast.error("Login Gagal, coba lagi!");
      return rejectWithValue("Login failed");
    }
  },
);

const savedAuth = JSON.parse(localStorage.getItem("user-storage") || "{}");

const authSlice = createSlice({
  name: "user",
  initialState: {
    user: savedAuth.user || null,
    isLoggedIn: savedAuth.isLoggedIn || false,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user-storage");
      toast.success("Anda telah Logout.");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isLoggedIn = true;
          localStorage.setItem(
            "user-storage",
            JSON.stringify({
              user: action.payload,
              isLoggedIn: true,
            }),
          );
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
