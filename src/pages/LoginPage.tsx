import { FunctionComponent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

const LoginPage: FunctionComponent = () => {
   const navigate = useNavigate();

   const { currentUser } = useContext(AuthContext) as AuthContextValue;

   useEffect(() => {
      if (currentUser?.id) {
         navigate('/beers');
      }
   }, []);

   return (
      <section className='h-screen'>
         <div className='flex justify-center mt-48 h-full text-gray-800'>
            <div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
               <h1 className='text-4xl text-center p-5 font-bold'>Login</h1>
               <LoginForm />
            </div>
         </div>
      </section>
   );
};

export default LoginPage;
