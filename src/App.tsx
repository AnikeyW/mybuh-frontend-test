import styled from 'styled-components';
import CompaniesLIst from './components/CompaniesLIst';

const AppWrapper = styled.div`
	width: 100%;
`;
const Title = styled.div`
	text-align: center;
	font-size: 18px;
	font-family: 'Open Sans', sans-serif;
	font-weight: 600;
	margin: 40px;
`;

function App() {
	return (
		<AppWrapper>
			<Title>Мои Организации</Title>
			<CompaniesLIst />
		</AppWrapper>
	);
}

export default App;
