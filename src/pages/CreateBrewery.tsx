import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreweryForm from '../components/BreweryForm';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

interface CreateBreweryProps {}

const CreateBrewery: FunctionComponent<CreateBreweryProps> = () => {
   const { currentUser } = useContext(AuthContext) as AuthContextValue;
   const navigate = useNavigate();

   useEffect(() => {
      if (currentUser.id === null) {
         navigate('/breweries');
      }
   }, [currentUser]);
   return (
      <main className='h-screen'>
         <div className='flex flex-center justify-center mt-14 text-gray-800'>
            <section className='xl:w-7/12 lg:w-8/12 md:w-9/12 w-10/12 '>
               <div className='font-semibold text-center items-center text-3xl'>
                  <FontAwesomeIcon icon={faBeerMugEmpty} className='mb-1' />
                  <h1 className='mb-3 font-serif'>Post a Brewery</h1>
               </div>
               <div className='mt-5'>
                  <BreweryForm type='create' />
               </div>
            </section>
         </div>
      </main>
   );
};

export default CreateBrewery;
