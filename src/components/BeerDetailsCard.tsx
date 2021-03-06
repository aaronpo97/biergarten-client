import { FunctionComponent, useContext } from 'react';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import { Link } from 'react-router-dom';
import BeerPostI from '../types/BeerPostI';
import AuthContext, { AuthContextValue } from '../contexts/AuthContext';

interface BeerCardProps {
   beerPost: BeerPostI;
}

const BeerDetailsCard: FunctionComponent<BeerCardProps> = ({ beerPost }) => {
   const createdAtDate = new Date(beerPost.createdAt);
   const timeDistance = formatDistanceStrict(createdAtDate, Date.now());

   const { currentUser } = useContext(AuthContext) as AuthContextValue;

   return (
      <div className='flex justify-center my-10'>
         <div className='flex flex-col md:flex-row w-full rounded-lg bg-gray-200 shadow-lg'>
            <img
               className='w-full h-100 lg:h-300 object-cover lg:w-48 rounded-t-lg lg:rounded-none lg:rounded-l-lg'
               src='https://www.heineken.com/media-us/01pfxdqq/heineken-original-bottle.png?quality=85'
               alt=''
            />
            <div className='p-6 flex flex-col'>
               <div>
                  <h2 className='text-gray-900 text-5xl font-bold mb-2'>
                     {beerPost.name}
                  </h2>
                  <h3 className='text-gray-900 text-3xl font-medium mb-2'>
                     by{' '}
                     <Link to={`/breweries/${beerPost.brewery.id}`}>
                        {beerPost.brewery.name}
                     </Link>
                  </h3>
               </div>

               <div>
                  <p className='text-gray-900 text-md-my-2'>
                     {beerPost.description}
                  </p>
               </div>

               <div>
                  <p className='text-gray-900 mt-3 text-md'>
                     {beerPost.abv}% ABV
                  </p>
                  <p className='text-gray-900 mb-3 text-md'>
                     {beerPost.ibu} IBU
                  </p>
               </div>
               <div>
                  <p>
                     {beerPost.postedBy.id === currentUser.id
                        ? `you posted this ${timeDistance} ago`
                        : `posted by ${beerPost.postedBy.username} ${timeDistance} ago`}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default BeerDetailsCard;
