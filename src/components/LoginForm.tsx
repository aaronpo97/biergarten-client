import { FunctionComponent, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginUser from '../api/loginUser';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

import FormButton from './ui/FormButton';
import FormSegment from './ui/FormSegment';
import FormLabel from './ui/FormLabel';
import FormTextInput from './ui/FormTextInput';
import FormInfo from './ui/FormInfo';
import FormError from './ui/FormError';

interface IFormInput {
   username: string;
   password: string;
}

const LoginForm: FunctionComponent<{}> = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInput>();

   const { setCurrentUser } = useContext(AuthContext) as AuthContextValue;
   const [errorMessage, setErrorMessage] = useState<null | string>(null);

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      const { username, password } = data;
      const response = await loginUser(username, password);

      if ('payload' in response) {
         const { accessToken, id, refreshToken } = response.payload;

         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('userId', id);
         localStorage.setItem('refreshToken', refreshToken);
         setCurrentUser({ username, id });
         navigate('/beers');
      }
      if (response.status === 400) {
         setErrorMessage(response.message);
      }
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <FormInfo>
            <FormLabel htmlFor='username'>Username</FormLabel>
            <FormError>
               {errors.username?.message ||
                  (errorMessage as string | undefined)}
            </FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='username'
               formRegister={register('username', {
                  required: 'Username is required.',
               })}
               error={!!errors.username}
               type='text'
               id='username'
            />
         </FormSegment>
         <FormSegment>
            <FormInfo>
               <FormLabel htmlFor='password'>Password</FormLabel>
               <FormError>
                  {errors.password?.message ||
                     (errorMessage as string | undefined)}
               </FormError>
            </FormInfo>
            <FormTextInput
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
               id='password'
            />
         </FormSegment>
         <FormButton>Login</FormButton>
      </form>
   );
};

export default LoginForm;
