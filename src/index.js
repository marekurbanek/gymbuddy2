// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/reducer';

const store = createStore(
    reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
const application = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(application, document.getElementById('root'));
registerServiceWorker();
