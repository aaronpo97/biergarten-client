import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getBeerPostById from '../api/getBeerPostById';
import getBeerPostComments from '../api/getBeerPostComments';
import BeerDetailsCard from '../components/BeerDetailsCard';
import BeerPostI from '../types/BeerPostI';

interface BeerPostByIdProps {}

const BeerPostById: FunctionComponent<BeerPostByIdProps> = () => {
   const { id } = useParams();

   if (!id) {
      return null;
   }

   const [beerPost, setBeerPost] = useState<BeerPostI | null>(null);
   const [comments, setComments] = useState<unknown[]>([]);
   useEffect(() => {
      getBeerPostById(id)
         .then((response) => {
            if ('payload' in response) {
               setBeerPost(response.payload);
            }
         })
         .then(() => getBeerPostComments(id))
         .then((response) => {
            if ('payload' in response) {
               setComments(response.payload);
            }
         });
   }, []);

   return (
      <div>
         {beerPost ? (
            <>
               <BeerDetailsCard beerPost={beerPost} />
               {JSON.stringify(comments)}
            </>
         ) : (
            <div>Loading</div>
         )}
      </div>
   );
};

export default BeerPostById;
