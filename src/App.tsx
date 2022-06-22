import './index.css';

import { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BeerPostsIndex from './pages/BeerPostsIndex';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BeerPostById from './pages/BeerPostById';

const App: FunctionComponent<{}> = () => (
   <BrowserRouter>
      <Routes>
         <Route index element={<HomePage />} />
         <Route path='login' element={<LoginPage />} />
         <Route path='register' element={<RegisterPage />} />
         <Route path='beers' element={<BeerPostsIndex />} />
         <Route path='beers/:id' element={<BeerPostById />} />
      </Routes>
   </BrowserRouter>
);

export default App;
