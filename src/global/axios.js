import axios from 'axios';
import { useSelector } from 'react-redux';
/**
 * Common API method
 * @param {string} method GET | POST | DELETE | PATCH
 * @param {string} baseURL http://api.example.com
 * @param {string} url /user/id
 * @param {object} params Query parameters
 * @param {object} headers API headers are appended to common headers
 * @param {object} body API body / Empty by default
 */

export const CommonAxios = async (
	method,
	url,
	params = {},
	headers = {},
	body = {}
	// baseURL = BASEURL.url
) => {
	const loginResponse = useSelector((state) => state.login.loginResponse);
	try {
		let auth_token = loginResponse?.token;
		console.log('auth_token?.token--------------->>>', auth_token);
		const commonHeaders = {
			//     email: localStorage.getItem('EMAIL_ID'),
			//     userId: localStorage.getItem('USER_ID'),
			// 'Access-Control-Allow-Origin': '*',
			Authorization: auth_token,
			//     userTokenUniqueId: localStorage.getItem('USER_TOKEN_ID'),
			//     deviceId: localStorage.getItem('DEVICEID'),
			//     deviceName: localStorage.getItem('DEVICENAME'),
			//     deviceModel: localStorage.getItem('DEVICEMODEL'),
			//     os: localStorage.getItem('OS'),
			//     osVersion: localStorage.getItem('OSVERSION'),
			//     browserVersion: localStorage.getItem('BROWSERVERSION'),
			//     id: localStorage.getItem('USER_ID'),
		};

		console.log('commonHeaders------------->>', commonHeaders);

		const response = await axios({
			method,
			// baseURL,
			url,
			params: { ...params },
			headers: { ...commonHeaders, ...headers },
			data: body,
		});
		return {
			status: response.status,
			message: response.data.message,
			data: response.data,
		};
	} catch (error) {
		return {
			data: error,
			err: error.response,
			message: error.response !== undefined ? error.response.statusText : '',
			status: error.response !== undefined ? error.response.status : 'failed',
		};
	}
};
