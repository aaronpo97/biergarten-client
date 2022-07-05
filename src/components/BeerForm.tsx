import { FunctionComponent, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import createBeerPost from '../api/createBeerPost';
import getAllBreweryPosts from '../api/getAllBreweryPosts';
import BreweryPostI from '../types/BreweryPostI';
import FormButton from './ui/forms/FormButton';
import FormError from './ui/forms/FormError';
import FormInfo from './ui/forms/FormInfo';
import FormLabel from './ui/forms/FormLabel';
import FormSegment from './ui/forms/FormSegment';
import FormSelect from './ui/forms/FormSelect';
import FormTextArea from './ui/forms/FormTextArea';
import FormTextInput from './ui/forms/FormTextInput';

interface IFormInput {
   name: string;
   description: string;
   type: string;
   abv: number;
   ibu: number;
   breweryId: string;
}

interface BeerFormProps {
   type: 'edit' | 'create';
   // eslint-disable-next-line react/require-default-props
   defaultValues?: IFormInput;
}
const BeerForm: FunctionComponent<BeerFormProps> = ({
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
         abv: defaultValues?.abv,
         ibu: defaultValues?.ibu,
      },
   });

   const navigate = useNavigate();

   const [breweries, setBreweries] = useState<BreweryPostI[]>([]);

   useEffect(() => {
      getAllBreweryPosts({ paginated: false }).then((response) => {
         if (!('payload' in response)) {
            return;
         }
         setBreweries(response.payload);
      });
   }, []);

   const onSubmit: SubmitHandler<IFormInput> = (data) => {
      createBeerPost(data).then((response) => {
         if (!('payload' in response)) {
            return;
         }
         navigate(`/beers/${response.payload.id}`);
      });
   };
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <FormInfo>
            <FormLabel htmlFor='name'>Name</FormLabel>
            <FormError>{errors.name?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='Lorem Ipsum Lager'
               formValidationSchema={register('name', {
                  required: 'Beer name is required.',
               })}
               error={!!errors.name}
               type='text'
               id='name'
            />
         </FormSegment>
         {type === 'create' && (
            <>
               <FormInfo>
                  <FormLabel htmlFor='breweryId'>Brewery</FormLabel>
                  <FormError>{errors.breweryId?.message}</FormError>
               </FormInfo>
               <FormSegment>
                  <FormSelect
                     error={!!errors.breweryId?.message}
                     id='breweryId'
                     options={breweries.map((brewery) => ({
                        value: brewery.id,
                        text: brewery.name,
                     }))}
                     formRegister={register('breweryId', {
                        required: 'Brewery is required.',
                     })}
                     placeholder='Brewery'
                     message='Pick a brewery'
                  />
               </FormSegment>
            </>
         )}

         <div className='md:mb-3 flex flex-wrap sm:text-xs'>
            <div className='md:w-1/2 w-full md:pr-3 mb-3 md:mb-0'>
               <FormInfo>
                  <FormLabel htmlFor='abv'>ABV</FormLabel>
                  <FormError>{errors.abv?.message}</FormError>
               </FormInfo>
               <FormTextInput
                  placeholder='12'
                  formValidationSchema={register('abv', {
                     required: 'ABV is required.',
                     valueAsNumber: true,
                     max: { value: 50, message: 'ABV must be less than 50%.' },
                     min: {
                        value: 0.1,
                        message: 'ABV must be greater than 0.1%',
                     },
                     validate: (abv) => !Number.isNaN(abv) || 'ABV is invalid.',
                  })}
                  error={!!errors.abv}
                  type='text'
                  id='abv'
               />
            </div>
            <div className='md:w-1/2 w-full md:pl-3 mb-3 md:mb-0'>
               <FormInfo>
                  <FormLabel htmlFor='ibu'>IBU</FormLabel>
                  <FormError>{errors.ibu?.message}</FormError>
               </FormInfo>
               <FormTextInput
                  placeholder='52'
                  formValidationSchema={register('ibu', {
                     required: 'IBU is required.',
                     min: {
                        value: 2,
                        message: 'IBU must be greater than 2.',
                     },
                     valueAsNumber: true,
                     validate: (ibu) => !Number.isNaN(ibu),
                  })}
                  error={!!errors.ibu}
                  type='text'
                  id='lastName'
               />
            </div>
         </div>

         <FormInfo>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <FormError>{errors.description?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextArea
               placeholder='Ratione cumque quas quia aut impedit ea culpa facere. Ut in sit et quas reiciendis itaque.'
               error={!!errors.description}
               formValidationSchema={register('description', {
                  required: 'Beer description is required.',
               })}
               id='description'
               rows={8}
            />
         </FormSegment>

         <FormInfo>
            <FormLabel htmlFor='type'>Type</FormLabel>
            <FormError>{errors.type?.message}</FormError>
         </FormInfo>
         <FormSegment>
            <FormTextInput
               placeholder='Lagered Ale'
               error={!!errors.type}
               formValidationSchema={register('type', {
                  required: 'Beer type is required.',
               })}
               id='type'
               type='text'
            />
         </FormSegment>

         <FormButton>{`${
            type === 'edit'
               ? `Edit ${defaultValues?.name || 'beer post'}`
               : 'Create beer post'
         } `}</FormButton>
      </form>
   );
};

export default BeerForm;
