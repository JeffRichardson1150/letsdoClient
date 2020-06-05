import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/* 
The default Port is 4000.  
...>node_modules>react-scripts>scripts>start.js  has been changed from 3000 to 4000 in the Default Port assignment
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 4000;
*/

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
