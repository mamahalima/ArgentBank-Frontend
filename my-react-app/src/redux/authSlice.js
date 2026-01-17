import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';
import { updateUserProfile ,getUserProfile} from './authThunks';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.body.token;
        state.user = {
          userName: action.payload.body.userName,
          firstName: action.payload.body.firstName,
          lastName: action.payload.body.lastName,
          id: action.payload.body.id,
        };

        localStorage.setItem('token', state.token);
        localStorage.setItem('user', JSON.stringify(state.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(getUserProfile.fulfilled, (state, action) => {
        if (!state.token) return;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (!state.token) return;
        state.user = {
          ...state.user,
          ...action.payload,
        };
        localStorage.setItem('user', JSON.stringify(state.user));
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
