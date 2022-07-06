import { FunctionComponent, useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginUser from '../api/loginUser';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';
import FormButton from './ui/forms/FormButton';
import FormError from './ui/forms/FormError';
import FormInfo from './ui/forms/FormInfo';
import FormLabel from './ui/forms/FormLabel';
import FormSegment from './ui/forms/FormSegment';
import FormTextInput from './ui/forms/FormTextInput';

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
         const { id } = response.payload;

         setCurrentUser({ username, id });
         navigate('/beers');
      }
      if (response.status === 400) {
         setErrorMessage(response.message);
      }
   };

   const usernameValidationSchema = register('username', {
      required: 'Username is required.',
   });

   const passwordValidationSchema = register('password', {
      required: 'Password is required.',
      minLength: {
         value: 8,
         message: 'Password must be eight or more characters.',
      },
   });

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
               formValidationSchema={usernameValidationSchema}
               error={!!errors.username}
               type='text'
               id='username'
            />
         </FormSegment>
         <FormInfo>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <FormError>
               {errors.password?.message ||
                  (errorMessage as string | undefined)}
            </FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='password'
               formValidationSchema={passwordValidationSchema}
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
