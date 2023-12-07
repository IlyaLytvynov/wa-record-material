import App from './App';
import { createBrowserRouter, Navigate  } from 'react-router-dom';
import { SearchPage, searchLoader } from './components/SearchPage';
import { DetailsPage } from './components/DetailsPage';
import { RandomMealPage } from './components/RandomMealPage';
export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' replace />,
      },
      {
        path: '/home',
        element: <RandomMealPage />,
      },
      {
        path: '/search',
        element: <SearchPage />
      },
      {
        path: '/details/:id',
        element: <DetailsPage />,
      },
    ],
  },
]);
