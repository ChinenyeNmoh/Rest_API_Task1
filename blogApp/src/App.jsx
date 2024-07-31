import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Base from './screens/Base';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import NotFoundScreen from './screens/NotFoundScreen';
import Home from './screens/Home';
import AllPosts from './screens/AllPosts';
import FullPost from './screens/FullPost';
import CreatePost from './screens/CreatePost';
import { Provider } from 'react-redux';
import store from './store';
import { HelmetProvider } from 'react-helmet-async';

function App() {

  // Creating a router using createBrowserRouter function
  const router = createBrowserRouter(
    // Creating routes using createRoutesFromElements function
    createRoutesFromElements(
      // Defining a route with path '/' that uses Base layout 
      <Route path='/' element={<Base />}>
        <Route index element={<Home />} />
        <Route path='/all' element={<AllPosts />} />
        <Route path='/post/:id' element={<FullPost />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='*' element={<NotFoundScreen />} />
      </Route>
    )
  );

  // Returning the RouterProvider component that uses the router created above
  return (
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  );
}

export default App;
