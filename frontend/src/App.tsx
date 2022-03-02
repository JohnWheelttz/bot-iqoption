import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import GlobalStyle from './styles/global';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter basename={`http://${process.env.REACT_APP_PUBLIC_URL}`} >
	  <GlobalStyle />
    <ToastContainer />
		<Routes />
	</BrowserRouter>
  </PersistGate>
    </Provider>
  );
}

export default App;