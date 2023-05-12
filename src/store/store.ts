import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './reducers/companiesSlice';
import formOwnershipsReducer from './reducers/formOwnershipsSlice';

export const store = configureStore({
	reducer: {
		companies: companiesReducer,
		formOwnerships: formOwnershipsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
