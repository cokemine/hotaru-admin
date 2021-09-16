import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const req = (require as any).context('./assets/img/client', true, /\.svg$/);
req.keys().map(req);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
