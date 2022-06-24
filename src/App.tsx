import './index.css';

import { createContext, Dispatch, FunctionComponent, SetStateAction, useReducer, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BeerPostsIndex from './pages/BeerPostsIndex';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BeerPostById from './pages/BeerPostById';
import AuthContext, { CurrentUserState } from './contexts/AuthContext';
import BreweryPostIndex from './pages/BreweryPostIndex';
import BreweryPostById from './pages/BreweryPostById';

const App: FunctionComponent<{}> = () => {
   const [currentUser, setCurrentUser] = useState<CurrentUserState>({ username: '', id: '' });

   // eslint-disable-next-line react/jsx-no-constructed-context-values
   const store = { currentUser, setCurrentUser };

   return (
      <AuthContext.Provider value={store}>
         <BrowserRouter>
            <Routes>
               <Route index element={<HomePage />} />
               <Route path='login' element={<LoginPage />} />
               <Route path='register' element={<RegisterPage />} />
               <Route path='beers' element={<BeerPostsIndex />} />
               <Route path='beers/:id' element={<BeerPostById />} />
               <Route path='breweries' element={<BreweryPostIndex />} />
               <Route path='breweries/:id' element={<BreweryPostById />} />
            </Routes>
         </BrowserRouter>
      </AuthContext.Provider>
   );
};
export default App;
