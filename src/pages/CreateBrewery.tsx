import { FunctionComponent } from 'react';
import CreateBreweryForm from '../components/CreateBreweryForm';

interface CreateBreweryProps {}

const CreateBrewery: FunctionComponent<CreateBreweryProps> = () => (
   <section className='xl:container xl:mx-auto px-100'>
      <CreateBreweryForm />
   </section>
);

export default CreateBrewery;
