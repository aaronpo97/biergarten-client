import { FunctionComponent, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import getCurrentAuthenticatedUser from '../api/getCurrentAuthenticatedUser';
import Navbar from '../components/ui/Navbar';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

const Boilerplate: FunctionComponent<{}> = () => {
   const { setCurrentUser } = useContext(AuthContext) as AuthContextValue;
   useEffect(() => {
      getCurrentAuthenticatedUser().then((user) => {
         setCurrentUser(user);
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
