import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import BeerPostI from '../types/BeerPostI';

interface BeerCardProps {
   beerPost: BeerPostI;
}

const BeerCard: FunctionComponent<BeerCardProps> = ({ beerPost }) => (
   <Link to={`/beers/${beerPost.id}`} className='flex justify-center my-10'>
      <div className='flex flex-col md:flex-row w-full rounded-lg bg-gray-200 shadow-lg hover:bg-gray-300'>
         <img
            className='w-full h-100 lg:h-300 object-cover lg:w-48 rounded-t-lg lg:rounded-none lg:rounded-l-lg'
            src='https://www.heineken.com/media-us/01pfxdqq/heineken-original-bottle.png?quality=85'
            alt=''
         />
         <div className='py-6 flex content-center'>
            <div className=''>
               <h2 className='text-gray-900 text-5xl font-bold mb-2'>{beerPost.name}</h2>
               <h3 className='text-gray-900 text-3xl font-medium mb-2'>by {beerPost.brewery.name}</h3>
            </div>
         </div>
      </div>
   </Link>
);

export default BeerCard;
