import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import createBreweryPost from '../api/createBreweryPost';
import FormButton from './ui/FormButton';
import FormTextInput from './ui/FormTextInput';

interface IFormInput {
   phoneNumber: string;
   description: string;
   location: string;
   name: string;
}
const CreateBreweryForm: FunctionComponent<{}> = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInput>();

   const onSubmit: SubmitHandler<IFormInput> = (data) => {
      const { name, description, location, phoneNumber } = data;

      createBreweryPost(name, description, location, phoneNumber).then(
         (response) => {
            console.log(response);
         },
      );
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='mb-6'>
            <FormTextInput
               placeholder='name'
               formRegister={register('name', { required: true })}
               error={errors.name}
               type='text'
            />
         </div>
         <div className='mb-6'>
            <FormTextInput
               placeholder='location'
               formRegister={register('location', { required: true })}
               error={errors.location}
               type='text'
            />
         </div>
         <div className='mb-6'>
            <FormTextInput
               placeholder='description'
               formRegister={register('description', { required: true })}
               error={errors.description}
               type='text'
            />
         </div>
         <div className='mb-6'>
            <FormTextInput
               placeholder='phone number'
               formRegister={register('phoneNumber', { required: true })}
               error={errors.phoneNumber}
               type='text'
            />
         </div>

         <FormButton text='Submit Brewery' />
      </form>
   );
};

export default CreateBreweryForm;
