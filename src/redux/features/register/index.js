import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../global/constant';
import axios from 'axios';

const initialState = {
	loading: false,
	registerResponse: [],
	error: '',
};

export const reduxRegister = createAsyncThunk('reduxRegister', (payload) => {
	console.log('payload', payload);
	return axios({
		method: 'post',
		url: `${API.BASE_URL + API.END_POINTS.REGISTER_ENDPOINT}`,
		data: payload, // you are sending body instead
		headers: {
			// 'Authorization': `bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			console.log('reduxLogin', response);
			window.location.href = '/';
			return response.data;
		})
		.catch((error) => {
			console.log('error', error);
		});
});

const registerSlice = createSlice({
	name: 'register',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(reduxRegister.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(reduxRegister.fulfilled, (state, action) => {
			state.loading = false;
			state.registerResponse = action.payload;
			state.error = '';
		});
		builder.addCase(reduxRegister.rejected, (state, action) => {
			state.loading = false;
			state.registerResponse = [];
			state.error = action.error.message;
		});
	},
});

export default registerSlice.reducer;
