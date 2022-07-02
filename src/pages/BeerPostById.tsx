import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getBeerPostById from '../api/getBeerPostById';
import BeerDetailsCard from '../components/BeerDetailsCard';
import BeerPostI from '../types/BeerPostI';

interface BeerPostByIdProps {}

const BeerPostById: FunctionComponent<BeerPostByIdProps> = () => {
   const { id } = useParams();

   if (!id) {
      return null;
   }

   const [beerPost, setBeerPost] = useState<BeerPostI | null>(null);
   useEffect(() => {
      getBeerPostById(id).then((response) => {
         if ('payload' in response) {
            setBeerPost(response.payload);
         }
      });
   }, []);

   return (
      <div>
         {beerPost ? (
            <BeerDetailsCard beerPost={beerPost} />
         ) : (
            <div>Loading</div>
         )}
      </div>
   );
};

export default BeerPostById;
