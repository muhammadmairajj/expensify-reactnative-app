import * as React from 'react';
import AppNavigation from './src/navigation/appNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </>
  );
}

export default App;
