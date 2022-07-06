import { faBeerMugEmpty } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FunctionComponent } from 'react';
import BeerForm from '../components/BeerForm';

interface CreateBeerProps {}

const CreateBeer: FunctionComponent<CreateBeerProps> = () => (
   <main className='h-screen'>
      <div className='flex flex-center justify-center mt-14'>
         <section className='xl:w-7/12 lg:w-8/12 md:w-9/12 w-10/12 '>
            <div className='font-semibold text-center text-3xl'>
               <FontAwesomeIcon icon={faBeerMugEmpty} className='mb-1' />
               <h1 className='mb-3 '>Post a Beer</h1>
            </div>
            <div className='mt-5'>
               <BeerForm type='create' />
            </div>
         </section>
      </div>
   </main>
);

export default CreateBeer;
