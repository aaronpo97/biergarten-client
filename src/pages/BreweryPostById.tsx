import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getBreweryPostById from '../api/getBreweryPostById';
import BreweryPostI from '../types/BreweryPostI';

interface BeerPostByIdProps {}

const BreweryPostById: FunctionComponent<BeerPostByIdProps> = () => {
   const { id } = useParams();

   if (!id) {
      return null;
   }

   const [breweryPost, setBreweryPost] = useState<BreweryPostI | null>(null);
   useEffect(() => {
      getBreweryPostById(id).then((response) => {
         if ('payload' in response) {
            setBreweryPost(response.payload);
         }
      });
   });

   return <div>{JSON.stringify(breweryPost)}</div>;
};

export default BreweryPostById;
