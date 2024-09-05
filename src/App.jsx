import React from 'react'
import Body from './Body';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <Provider store={appStore}>
       <Body/>
    </Provider>
    </BrowserRouter>
  )
}

export default App;
