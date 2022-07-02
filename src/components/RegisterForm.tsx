import { FunctionComponent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import checkIfEmailExists from '../api/checkIfEmailExists';
import checkIfUsernameExists from '../api/checkIfUsernameExists';
import registerUser from '../api/registerUser';
import validateDateOfBirth from '../util/validateDateOfBirth';
import FormButton from './ui/forms/FormButton';
import FormError from './ui/forms/FormError';
import FormInfo from './ui/forms/FormInfo';
import FormLabel from './ui/forms/FormLabel';
import FormSegment from './ui/forms/FormSegment';
import FormTextInput from './ui/forms/FormTextInput';

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

   const [serverResponseErrors, setServerResponseErrors] = useState<{
      username?: string;
      email?: string;
   }>({});

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
      const { username, email, dateOfBirth, password, firstName, lastName } =
         data;
      const registerResponse = await registerUser(
         username,
         email,
         dateOfBirth,
         password,
         firstName,
         lastName,
      );

      if (registerResponse.success) {
         navigate('/beers');
      }
   };

   const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;

   return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
         <div className='md:mb-3 flex flex-wrap sm:text-xs'>
            <div className='md:w-1/2 w-full md:pr-3 mb-3 md:mb-0'>
               <FormInfo>
                  <FormLabel htmlFor='username'>First name</FormLabel>
                  <FormError>{errors.firstName?.message}</FormError>
               </FormInfo>
               <FormTextInput
                  placeholder='Jane'
                  formRegister={register('firstName', {
                     required: 'First name is required.',
                     minLength: {
                        value: 2,
                        message:
                           'First name must be greater than two characters. ',
                     },
                     validate: (firstName) =>
                        /[^0-9!@#$%^&*(),]+/.test(firstName) ||
                        'First name is invalid.',
                  })}
                  error={!!errors.firstName}
                  type='text'
                  id='firstName'
               />
            </div>
            <div className='md:w-1/2 w-full md:pl-3 mb-3 md:mb-0'>
               <FormInfo>
                  <FormLabel htmlFor='username'>Last name</FormLabel>
                  <FormError>{errors.lastName?.message}</FormError>
               </FormInfo>
               <FormTextInput
                  placeholder='Doe'
                  formRegister={register('lastName', {
                     required: 'Last name is required.',
                     minLength: {
                        value: 2,
                        message:
                           'Last name must be greater than two characters. ',
                     },
                     validate: (lastName) =>
                        /[^0-9!@#$%^&*(),]+/.test(lastName) ||
                        'Last name is invalid.',
                  })}
                  error={!!errors.lastName}
                  type='text'
                  id='lastName'
               />
            </div>
         </div>
         <FormSegment>
            <FormInfo>
               <FormLabel htmlFor='username'>Username</FormLabel>
               <FormError>
                  {errors.username?.message || serverResponseErrors.username}
               </FormError>
            </FormInfo>
            <FormTextInput
               placeholder='jane.doe'
               formRegister={register('username', {
                  required: 'Username is required.',
                  minLength: {
                     value: 2,
                     message: 'Username must be greater than two characters.',
                  },
                  validate: async (username) => {
                     const response = await checkIfUsernameExists(username);
                     const isValid =
                        'payload' in response &&
                        !response.payload.usernameTaken;

                     return isValid || response.message;
                  },
               })}
               error={!!errors.username || !!serverResponseErrors.username}
               type='text'
               id='username'
            />
         </FormSegment>
         <FormSegment>
            <FormInfo>
               <FormLabel htmlFor='email'>Email</FormLabel>
               <FormError>{errors.email?.message}</FormError>
            </FormInfo>
            <FormTextInput
               id='email'
               placeholder='jane.doe@example.com'
               formRegister={register('email', {
                  required: 'Email is required.',
                  pattern: { message: 'Email is invalid.', value: emailRegex },
                  validate: async (email) => {
                     const response = await checkIfEmailExists(email);
                     const isValid =
                        'payload' in response && !response.payload.emailTaken;

                     return isValid || response.message;
                  },
               })}
               error={!!errors.email}
               type='email'
            />
         </FormSegment>
         <FormSegment>
            <FormInfo>
               <FormLabel htmlFor='password'>Password</FormLabel>
               <FormError>{errors.password?.message}</FormError>
            </FormInfo>
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
               error={!!errors.password}
               type='password'
            />
         </FormSegment>

         <FormSegment>
            <FormInfo>
               <FormLabel htmlFor='date-of-birth'>Date of birth</FormLabel>
               <FormError>{errors.dateOfBirth?.message}</FormError>
            </FormInfo>
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
               error={!!errors.dateOfBirth}
               type='date'
            />
         </FormSegment>

         <FormButton>Register</FormButton>
      </form>
   );
};

export default RegisterForm;
