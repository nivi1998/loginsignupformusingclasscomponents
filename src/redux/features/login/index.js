import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../../global/constant';
import axios from 'axios';

const initialState = {
	loading: false,
	loginResponse: [],
	error: '',
	role: '',
};

export const reduxLogin = createAsyncThunk('login/reduxLogin', (payload) => {
	console.log('payload', payload);
	return axios({
		method: 'post',
		url: `${API.BASE_URL + API.END_POINTS.LOGIN_ENDPOINT}`,
		data: payload, // you are sending body instead
		headers: {
			// 'Authorization': `bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			console.log('reduxLogin', response);
			window.location.href = '/home';
			return response.data;
		})
		.catch((error) => {
			console.log('error', error);
		});
});

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		USER_LOGOUT: (state, action) => {
			state.loginResponse = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(reduxLogin.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(reduxLogin.fulfilled, (state, action) => {
			// return (
			state.loading = false;
			state.loginResponse = action.payload;
			state.error = '';
			// );
		});
		builder.addCase(reduxLogin.rejected, (state, action) => {
			state.loading = false;
			state.loginResponse = [];
			state.error = action.error.message;
		});
	},
});

export const { USER_LOGOUT } = loginSlice.actions;
export default loginSlice.reducer;
