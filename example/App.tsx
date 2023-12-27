import './App.less';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './config';

function App() {
  const elementRoute = useRoutes(routes);
  return <Suspense fallback>{elementRoute}</Suspense>;
}

export default App;
