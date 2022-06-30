import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import RegisterForm from '../components/RegisterForm';

interface RegisterPageProps {}

const RegisterPage: FunctionComponent<RegisterPageProps> = () => (
   <main className='h-screen'>
      <div className='flex flex-center justify-center mt-14 text-gray-800'>
         <section className='xl:w-7/12 lg:w-8/12 md:w-9/12 w-10/12 '>
            <div className='font-semibold text-center text-3xl'>
               <FontAwesomeIcon icon={faCircleUser} className='mb-1' />
               <h1 className='mb-3 '>Create an Account</h1>
            </div>
            <div className='mt-5'>
               <RegisterForm />
            </div>
         </section>
      </div>
   </main>
);

export default RegisterPage;
