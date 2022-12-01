import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import loginReducer from './features/login';
import registerReducer from './features/register';

const persistConfig = {
	key: 'rootCreateForm',
	version: 1,
	storage,
	blacklist: [],
};

const reducer = combineReducers({
	login: loginReducer,
	register: registerReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'login/USER_LOGOUT') {
		storage.removeItem('persist:root');
		return reducer(undefined, action);
	}
	return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
			thunk: true,
		}),
});

export default store;
