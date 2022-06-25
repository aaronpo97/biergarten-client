import { FunctionComponent } from 'react';
import RegisterForm from '../components/RegisterForm';

interface RegisterPageProps {}

const RegisterPage: FunctionComponent<RegisterPageProps> = () => (
   <section className='h-screen'>
      <div className='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
         <div className='md:w-8/12 lg:w-5/12 lg:ml-20'>
            <RegisterForm />
         </div>
      </div>
   </section>
);

export default RegisterPage;
