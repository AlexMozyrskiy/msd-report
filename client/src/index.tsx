import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './App';

import './library/styles/normalizeCSS/normalize.scss';

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </HashRouter>,
  document.getElementById('root')
);
