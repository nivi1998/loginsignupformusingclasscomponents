import Routes from './routes';
import Layout from './layout';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';

import './App.css';

let persistor = persistStore(store);

function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<Layout>
						<Routes />
					</Layout>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

export default App;
