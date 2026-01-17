import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from '../config/api';

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ userName }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      
      if (!token) return rejectWithValue("Utilisateur non connecté");

      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  
  'auth/getUserProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

