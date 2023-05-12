import { useEffect } from 'react';
import { fetchCompanies } from './store/reducers/actionCreators';
import { useAppDispatch, useAppSelector } from './hooks/hooks';

function App() {
	const dispatch = useAppDispatch();
	const { companies } = useAppSelector((state) => state.companies);

	useEffect(() => {
		dispatch(fetchCompanies());
	}, []);

	if (!companies.length) return null;

	return (
		<div>
			{companies.map((company) => (
				<div>{company.company_name}</div>
			))}
		</div>
	);
}

export default App;
