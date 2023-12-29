import ReactDOM from 'react-dom/client';
import App from './App';
import './index.less';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { BASE_URL } from './constants';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter basename={BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
