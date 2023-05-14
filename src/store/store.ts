import { configureStore } from '@reduxjs/toolkit';
import companiesReducer from './reducers/companiesSlice';
import formOwnershipsReducer from './reducers/formOwnershipsSlice';
import taxesReducer from './reducers/taxSlice';
import taxFormReducer from './reducers/taxFormSlice';

export const store = configureStore({
	reducer: {
		companies: companiesReducer,
		formOwnerships: formOwnershipsReducer,
		tax: taxesReducer,
		taxFormGuide: taxFormReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
