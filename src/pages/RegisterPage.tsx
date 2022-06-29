import { FunctionComponent } from 'react';
import RegisterForm from '../components/RegisterForm';

interface RegisterPageProps {}

const RegisterPage: FunctionComponent<RegisterPageProps> = () => (
   <main className='h-screen'>
      <div className='flex flex-center justify-center mt-16 h-full text-gray-800'>
         <section className='w-8/12'>
            <h1 className='text-3xl font-bold text-center'>Register User</h1>
            <div className='mt-5'>
               <RegisterForm />
            </div>
         </section>
      </div>
   </main>
);

export default RegisterPage;
