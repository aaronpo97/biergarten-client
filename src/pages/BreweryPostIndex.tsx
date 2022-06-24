import { FunctionComponent, useEffect, useState } from 'react';
import getAllBreweryPosts from '../api/getAllBreweryPosts';
import BreweryPostI from '../types/BreweryPostI';

interface BreweryPostIndexProps {}

const BreweryPostIndex: FunctionComponent<BreweryPostIndexProps> = () => {
   const [breweryPosts, setBreweryPosts] = useState<BreweryPostI[]>([]);

   useEffect(() => {
      getAllBreweryPosts().then((response) => {
         setBreweryPosts(response.payload);
      });
   }, []);

   return <div>{JSON.stringify(breweryPosts)}</div>;
};

export default BreweryPostIndex;
