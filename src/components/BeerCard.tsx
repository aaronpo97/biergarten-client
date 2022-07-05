import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import BeerPostI from '../types/BeerPostI';

interface BeerCardProps {
   beerPost: BeerPostI;
}

const BeerCard: FunctionComponent<BeerCardProps> = ({ beerPost }) => (
   <Link to={`/beers/${beerPost.id}`}>
      <div className='flex flex-col h-auto rounded-lg bg-gray mb-10 shadow-lg hover:bg-gray-300'>
         <img
            className=''
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flowr.q.jpg/1280px-Flowr.q.jpg'
            alt=''
         />

         <div className='p-2'>
            <h2 className='text-gray-900 text-2xl font-bold mb-1'>
               {beerPost.name}
            </h2>
            <h3 className='text-gray-900 text-lg font-medium mb-2'>
               {beerPost.brewery.name}
            </h3>

            <p>{beerPost.abv}% ABV</p>
         </div>
      </div>
   </Link>
);

export default BeerCard;
