import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getBreweryPostById from '../api/getBreweryPostById';
import BreweryForm from '../components/BreweryForm';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';
import BreweryPostI from '../types/BreweryPostI';

interface EditBreweryProps {}

const EditBrewery: FunctionComponent<EditBreweryProps> = () => {
   const { id } = useParams();
   const { currentUser } = useContext(AuthContext) as AuthContextValue;

   const navigate = useNavigate();

   if (!id) {
      return null;
   }

   const [breweryPost, setBreweryPost] = useState<BreweryPostI | null>(null);
   useEffect(() => {
      if (!currentUser.id) {
         return;
      }

      getBreweryPostById(id).then((response) => {
         if ('payload' in response) {
            setBreweryPost(response.payload);
            if (currentUser.id !== response.payload.postedBy?.id) {
               navigate(`/breweries/${id}`);
            }
         }
      });
   }, [currentUser.id]);

   return (
      <main className='h-screen'>
         <div className='flex flex-center justify-center mt-14 text-gray-800'>
            <section className='xl:w-7/12 lg:w-8/12 md:w-9/12 w-10/12 '>
               <div className='font-semibold text-center text-3xl'>
                  <FontAwesomeIcon icon={faBeerMugEmpty} className='mb-1' />
                  <h1 className='mb-3 '>
                     Edit &quot;{breweryPost?.name}&quot;
                  </h1>
               </div>
               <div className='mt-5'>
                  {breweryPost && (
                     <BreweryForm
                        type='edit'
                        defaultValues={breweryPost}
                        postId={id}
                     />
                  )}
               </div>
            </section>
         </div>
      </main>
   );
};

export default EditBrewery;
