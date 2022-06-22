import { FunctionComponent, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import loginUser from '../api/loginUser';
import FormButton from './ui/FormButton';
import FormTextInput from './ui/FormTextInput';

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

   const [errorMessage, setErrorMessage] = useState<null | string>(null);

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IFormInput> = async (data) => {
      const { username, password } = data;
      const response = await loginUser(username, password);

      if (response.status === 200) {
         const { accessToken, id, refreshToken } = response.payload;
         localStorage.setItem('accessToken', accessToken);
         localStorage.setItem('userId', id);
         localStorage.setItem('refreshToken', refreshToken);
         navigate('/beers');
      }
      if (response.status === 400) {
         setErrorMessage(response.message);
      }
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='mb-6'>
            <FormTextInput
               placeholder='username'
               formRegister={register('username', { required: true })}
               error={errors.username}
            />
         </div>
         <div className='mb-6'>
            <FormTextInput
               placeholder='password'
               formRegister={register('password', { required: true })}
               error={errors.password}
            />
         </div>
         {errorMessage && (
            <div>
               <p>{errorMessage}</p>
            </div>
         )}
         <FormButton text='Login' />
      </form>
   );
};

export default LoginForm;
