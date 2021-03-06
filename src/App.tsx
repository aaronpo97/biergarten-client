import './index.css';

import { FunctionComponent, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BeerPostById from './pages/BeerPostById';
import BeerPostsIndex from './pages/BeerPostsIndex';
import BreweryPostById from './pages/BreweryPostById';
import BreweryPostIndex from './pages/BreweryPostIndex';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import AuthContext, { CurrentUserState } from './contexts/AuthContext';

import Boilerplate from './pages/Boilerplate';

import CreateBrewery from './pages/CreateBrewery';
import EditBrewery from './pages/EditBrewery';
import CreateBeer from './pages/CreateBeer';

const App: FunctionComponent<{}> = () => {
   const [currentUser, setCurrentUser] = useState<CurrentUserState>({
      username: '',
      id: '',
   });

   // eslint-disable-next-line react/jsx-no-constructed-context-values
   const store = { currentUser, setCurrentUser };

   return (
      <AuthContext.Provider value={store}>
         <BrowserRouter>
            <Routes>
               <Route element={<Boilerplate />}>
                  <Route index element={<HomePage />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='register' element={<RegisterPage />} />
                  <Route path='beers' element={<BeerPostsIndex />} />
                  <Route path='beers/create' element={<CreateBeer />} />
                  <Route path='beers/:id' element={<BeerPostById />} />
                  <Route path='beers/:edit' element={<BeerPostById />} />
                  <Route path='breweries' element={<BreweryPostIndex />} />
                  <Route path='breweries/create' element={<CreateBrewery />} />
                  <Route path='breweries/:id' element={<BreweryPostById />} />
                  <Route path='breweries/:id/edit' element={<EditBrewery />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </AuthContext.Provider>
   );
};
export default App;
