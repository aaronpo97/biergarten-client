import { FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import createBreweryPost from '../api/createBreweryPost';
import editBreweryPost from '../api/editBreweryPost';
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
   defaultValues?: IFormInput;
   postId?: string;
}
const BreweryForm: FunctionComponent<BreweryFormProps> = ({
   type,
   defaultValues,
   postId,
}) => {
   const { register, handleSubmit, formState } = useForm<IFormInput>({
      defaultValues: {
         name: defaultValues?.name,
         description: defaultValues?.description,
         location: defaultValues?.location,
         phoneNumber: defaultValues?.phoneNumber,
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
                  const { id: newBreweryId } = response.payload;
                  navigate(`/breweries/${newBreweryId}`);
               })
               .catch();
            break;

         case 'edit':
            if (!postId) {
               throw new Error();
            }
            editBreweryPost(postId, data).then((response) => {
               if (!('payload' in response)) {
                  return;
               }

               navigate(`/breweries/${postId}`);
            });
            break;

         default:
            throw new TypeError(
               `Component prop 'type' must be 'create' or 'edit'.`,
            );
      }
   };

   const nameValidationSchema = register('name', {
      required: 'Brewery name is required.',
   });
   const locationValidationSchema = register('location', {
      required: 'Brewery location is required.',
   });
   const descriptionValidationSchema = register('description', {
      required: 'Brewery description is required.',
   });
   const phoneNumberValidationSchema = register('phoneNumber', {
      required: 'Brewery phone number is required.',
   });

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <FormInfo>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <FormError>{formState.errors.name?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='Lorem Ipsum Brewing Company'
               formValidationSchema={nameValidationSchema}
               error={!!formState.errors.name}
               type='text'
               id='name'
            />
         </FormSegment>
         <FormInfo>
            <FormLabel htmlFor='location'>location</FormLabel>
            <FormError>{formState.errors.location?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='123 Any Street, City, Country'
               formValidationSchema={locationValidationSchema}
               error={!!formState.errors.location}
               type='text'
               id='location'
            />
         </FormSegment>

         <FormInfo>
            <FormLabel htmlFor='description'>About</FormLabel>
            <FormError>{formState.errors.description?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextArea
               placeholder='Inventore quidem minus et. Maxime aut velit quos ex sed qui. Dolor sapiente harum molestiae fugit omnis itaque et quisquam velit. Deserunt autem laudantium ea ab accusamus.'
               formValidationSchema={descriptionValidationSchema}
               error={!!formState.errors.description}
               id='description'
               rows={6}
            />
         </FormSegment>
         <FormInfo>
            <FormLabel htmlFor='phone number'>Phone number</FormLabel>
            <FormError>{formState.errors.phoneNumber?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='phone number'
               formValidationSchema={phoneNumberValidationSchema}
               error={!!formState.errors.phoneNumber}
               type='text'
               id='phone-number'
            />
         </FormSegment>

         <FormButton>Submit Brewery</FormButton>
      </form>
   );
};

BreweryForm.defaultProps = {
   defaultValues: {
      description: '',
      location: '',
      name: '',
      phoneNumber: '',
   },
   postId: undefined,
};
export default BreweryForm;
