import { FunctionComponent } from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: FunctionComponent = () => (
   <section className='h-screen'>
      <div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
         <div className='md:w-8/12 lg:w-6/12 mb-12 md:mb-0'>
            <img src='' className='w-full' alt='phone' />
         </div>
         <div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
            <LoginForm />
         </div>
      </div>
   </section>
);

export default LoginPage;
