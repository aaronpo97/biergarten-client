import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
      <div className='h-screen'>
         <div className='flex flex-center justify-center mt-14 text-gray-800'>
            <section className='xl:w-7/12 lg:w-8/12 md:w-9/12 w-10/12 '>
               <div className='font-semibold text-center text-3xl'>
                  <FontAwesomeIcon icon={faCircleUser} className='mb-1' />
                  <h1 className='mb-3 '>Login</h1>
               </div>
               <LoginForm />
            </section>
         </div>
      </div>
   );
};

export default LoginPage;
