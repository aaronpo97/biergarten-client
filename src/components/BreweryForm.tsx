import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import createBreweryPost from '../api/createBreweryPost';
import FormButton from './ui/forms/FormButton';
import FormError from './ui/forms/FormError';
import FormInfo from './ui/forms/FormInfo';
import FormLabel from './ui/forms/FormLabel';
import FormSegment from './ui/forms/FormSegment';
import FormTextArea from './ui/forms/FormTextArea';
import FormTextInput from './ui/forms/FormTextInput';

interface IFormInput {
   phoneNumber: string;
   description: string;
   location: string;
   name: string;
}

interface BreweryFormProps {
   type: 'edit' | 'create';
   // eslint-disable-next-line react/require-default-props
   defaultValues?: IFormInput;
}
const BreweryForm: FunctionComponent<BreweryFormProps> = ({
   type,
   defaultValues,
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IFormInput>({
      defaultValues: {
         name: defaultValues?.name,
         description: defaultValues?.description,
         location: defaultValues?.location,
         phoneNumber: defaultValues?.location,
      },
   });

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<IFormInput> = (data) => {
      switch (type) {
         case 'create':
            createBreweryPost(data)
               .then((response) => {
                  if (!('payload' in response)) {
                     return;
                  }
                  const { id } = response.payload;
                  navigate(`/breweries/${id}`);
               })
               .catch((error) => {
                  console.error(error);
               });
            break;

         case 'edit':
            break;

         default:
            throw new TypeError(
               `Component prop 'type' must be 'create' or 'edit'.`,
            );
      }
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <FormInfo>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <FormError>{errors.name?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='Lorem Ipsum Brewing Company'
               formRegister={register('name', {
                  required: 'Brewery name is required.',
               })}
               error={!!errors.name}
               type='text'
               id='name'
            />
         </FormSegment>
         <FormInfo>
            <FormLabel htmlFor='location'>location</FormLabel>
            <FormError>{errors.location?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='123 Any Street, City, Country'
               formRegister={register('location', {
                  required: 'Brewery location is required.',
               })}
               error={!!errors.location}
               type='text'
               id='location'
            />
         </FormSegment>

         <FormInfo>
            <FormLabel htmlFor='description'>About</FormLabel>
            <FormError>{errors.description?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextArea
               placeholder='Inventore quidem minus et. Maxime aut velit quos ex sed qui. Dolor sapiente harum molestiae fugit omnis itaque et quisquam velit. Deserunt autem laudantium ea ab accusamus.'
               formRegister={register('description', {
                  required: 'Brewery description is required.',
               })}
               error={!!errors.description}
               id='description'
               rows={6}
            />
         </FormSegment>
         <FormInfo>
            <FormLabel htmlFor='phone number'>Phone number</FormLabel>
            <FormError>{errors.phoneNumber?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='phone number'
               formRegister={register('phoneNumber', {
                  required: 'Brewery phone number is required.',
               })}
               error={!!errors.phoneNumber}
               type='text'
               id='phone-number'
            />
         </FormSegment>

         <FormButton>Submit Brewery</FormButton>
      </form>
   );
};

export default BreweryForm;
