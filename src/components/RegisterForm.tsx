import { intervalToDuration, isValid } from 'date-fns';
import { FunctionComponent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import registerUser from '../api/registerUser';

import FormButton from './ui/FormButton';
import FormTextInput from './ui/FormTextInput';

export interface IRegisterFormInput {
   username: string;
   password: string;
   email: string;
   dateOfBirth: string;
}

const RegisterForm: FunctionComponent<{}> = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IRegisterFormInput>();

   const [errorMessage, setErrorMessage] = useState<null | string>(null);

   const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
      const { username, email, dateOfBirth, password } = data;
      const registerResponse = await registerUser(username, email, dateOfBirth, password);

      if (!registerResponse.success) {
         setErrorMessage(registerResponse.message);
      }
   };

   const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
   return (
      <>
         <h1 className='font-medium text-center text-4xl'>Register User</h1>
         <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='mb-6'>
               <FormTextInput
                  placeholder='username'
                  formRegister={register('username', { required: true, min: 2 })}
                  error={errors.username}
                  type='text'
               />
            </div>
            <div className='mb-6'>
               <FormTextInput
                  placeholder='password'
                  formRegister={register('password', { required: true, min: 8, max: 32 })}
                  error={errors.password}
                  type='password'
               />
            </div>
            <div className='mb-6'>
               <FormTextInput
                  placeholder='email'
                  formRegister={register('email', {
                     required: true,
                     pattern: emailRegex,
                  })}
                  error={errors.email}
                  type='email'
               />
            </div>
            <div className='mb-6'>
               <FormTextInput
                  placeholder='date of birth'
                  formRegister={register('dateOfBirth', {
                     required: true,
                     validate: (dateOfBirth) => {
                        const birthday = new Date(Date.parse(dateOfBirth));
                        const isValidDate = isValid(birthday);

                        if (!isValidDate) {
                           return false;
                        }

                        const age = intervalToDuration({ start: birthday, end: Date.now() });

                        const ageInYears = age.years;

                        if (!ageInYears || ageInYears < 19) {
                           return false;
                        }
                        return true;
                     },
                  })}
                  error={errors.dateOfBirth}
                  type='date'
               />
            </div>
            {/* {errors.dateOfBirth?.type === 'required' && 'Date of birth is required.'} */}
            {errorMessage && (
               <div>
                  <p>{errorMessage}</p>
               </div>
            )}
            <FormButton text='Login' />
         </form>
      </>
   );
};

export default RegisterForm;
