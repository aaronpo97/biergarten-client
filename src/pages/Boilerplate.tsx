import { FunctionComponent, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import getCurrentAuthenticatedUser from '../api/getCurrentAuthenticatedUser';
import Navbar from '../components/ui/navbar/Navbar';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

const Boilerplate: FunctionComponent<{}> = () => {
   const { setCurrentUser } = useContext(AuthContext) as AuthContextValue;

   const accessToken = localStorage.getItem('accessToken');
   const refreshToken = localStorage.getItem('refreshToken');
   useEffect(() => {
      if (!(refreshToken && accessToken)) {
         localStorage.clear();
         setCurrentUser({ id: null, username: null });
         return;
      }
      getCurrentAuthenticatedUser().then((response) => {
         if ('payload' in response) {
            setCurrentUser(response.payload);
            return;
         }
         setCurrentUser({ id: null, username: null });
      });
   }, []);
   return (
      <>
         <Navbar />
         <Outlet />;
      </>
   );
};

export default Boilerplate;
