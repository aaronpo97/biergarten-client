import { FunctionComponent, useEffect, useState } from 'react';
import getAllBeerPosts from '../api/getAllBeerPosts';
import BeerCard from '../components/BeerCard';
import BeerPostI from '../types/BeerPostI';

interface BeerPostsIndexProps {}

const BeerPostsIndex: FunctionComponent<BeerPostsIndexProps> = () => {
   const [beerPosts, setBeerPosts] = useState<BeerPostI[] | null>(null);
   // eslint-disable-next-line no-unused-vars
   const [pageNum, setPageNum] = useState<number>(1);

   useEffect(() => {
      getAllBeerPosts(pageNum, 10).then((response) => {
         setBeerPosts(response.payload.allBeers);
      });
   }, [pageNum]);

   return (
      <section className='xl:container xl:mx-auto px-100'>
         {beerPosts?.length && beerPosts.map((beerPost) => <BeerCard beerPost={beerPost} />)}
      </section>
   );
};

export default BeerPostsIndex;