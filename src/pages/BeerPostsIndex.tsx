import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAllBeerPosts from '../api/getAllBeerPosts';
import BeerCard from '../components/BeerCard';
import BeerPostI from '../types/BeerPostI';

interface BeerPostsIndexProps {}

const BeerPostsIndex: FunctionComponent<BeerPostsIndexProps> = () => {
   const [beerPosts, setBeerPosts] = useState<BeerPostI[]>([]);
   // eslint-disable-next-line no-unused-vars
   const [pageNum, setPageNum] = useState<number>(1);

   useEffect(() => {
      getAllBeerPosts(pageNum, 10).then((response) => {
         if (!('payload' in response)) {
            return;
         }
         setBeerPosts(response.payload.allBeers);
      });
   }, [pageNum]);

   return (
      <div>
         <header className='h-96 bg-gray-900 flex items-center justify-center flex-col'>
            <h1 className='font-semibold text-7xl text-white py-6'>Beers</h1>
         </header>

         <div className='xl:container xl:mx-auto mt-16'>
            <Link to='/beers/create' className='mb-10 text-3xl'>
               Post a beer
            </Link>
            {!!beerPosts.length &&
               beerPosts.map((beerPost) => (
                  <BeerCard beerPost={beerPost} key={beerPost.id} />
               ))}
         </div>
      </div>
   );
};

export default BeerPostsIndex;
