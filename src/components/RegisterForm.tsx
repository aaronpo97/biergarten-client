import { intervalToDuration, isValid } from 'date-fns';
import { FunctionComponent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import registerUser from '../api/registerUser';
import FormError from './ui/FormError';

import FormButton from './ui/FormButton';
import FormLabel from './ui/FormLabel';
import FormTextInput from './ui/FormTextInput';
import validateDateOfBirth from '../util/validateDateOfBirth';

export interface IRegisterFormInput {
   username: string;
   password: string;
   email: string;
   dateOfBirth: string;
   firstName: string;
   lastName: string;
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
      const registerResponse = await registerUser(
         username,
         email,
         dateOfBirth,
         password,
      );

      if (!registerResponse.success) {
         setErrorMessage(registerResponse.message);
      }
   };

   const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         <div className='mb-3 flex flex-wrap'>
            <div className='w-1/2 pr-3 mb-3 md:mb-0'>
               <FormLabel htmlFor='username'>First name</FormLabel>
               <FormTextInput
                  placeholder='Jane'
                  formRegister={register('firstName', {
                     required: 'First name is required.',
                     minLength: {
                        value: 2,
                        message:
                           'First name must be greater than two characters. ',
                     },
                  })}
                  error={errors.firstName}
                  type='text'
                  id='firstName'
               />

               <FormError>{errors.firstName?.message}</FormError>
            </div>
            <div className=' w-1/2 pl-3 mb-3 md:mb-0'>
               <FormLabel htmlFor='username'>Last name</FormLabel>
               <FormTextInput
                  placeholder='Doe'
                  formRegister={register('lastName', {
                     required: 'Last name is required.',
                     minLength: {
                        value: 2,
                        message:
                           'Last name must be greater than two characters. ',
                     },
                  })}
                  error={errors.lastName}
                  type='text'
                  id='lastName'
               />
               <FormError>{errors.lastName?.message}</FormError>
            </div>
         </div>
         <div className='mb-3'>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <FormTextInput
               placeholder='jane.doe'
               formRegister={register('username', {
                  required: 'Username is required.',
                  minLength: {
                     value: 2,
                     message: 'Username must be greater than two characters.',
                  },
               })}
               error={errors.username}
               type='text'
               id='username'
            />
            <FormError>{errors.username?.message}</FormError>
         </div>
         <div className='mb-3'>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <FormTextInput
               id='email'
               placeholder='jane.doe@example.com'
               formRegister={register('email', {
                  required: 'Email is required.',
                  pattern: { message: 'Email is invalid.', value: emailRegex },
               })}
               error={errors.email}
               type='email'
            />
            <FormError>{errors.email?.message}</FormError>
         </div>
         <div className='mb-3'>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormTextInput
               id='password'
               placeholder='password'
               formRegister={register('password', {
                  required: 'Password is required.',
                  minLength: {
                     value: 8,
                     message: 'Password must be eight or more characters.',
                  },
               })}
               error={errors.password}
               type='password'
            />
            <FormError>{errors.password?.message}</FormError>
         </div>

         <div className='mb-8'>
            <FormLabel htmlFor='date-of-birth'>Date of birth</FormLabel>
            <FormTextInput
               id='date-of-birth'
               formRegister={register('dateOfBirth', {
                  required: 'Date of birth is required.',
                  validate: (dateOfBirth) =>
                     validateDateOfBirth(
                        new Date(Date.parse(dateOfBirth)),
                        19,
                     ) || 'You are not old enough to use this application.',
               })}
               error={errors.dateOfBirth}
               type='date'
            />
            <FormError>{errors.dateOfBirth?.message}</FormError>
         </div>
         <div>
            <FormButton>Register</FormButton>
         </div>
      </form>
   );
};

export default RegisterForm;
