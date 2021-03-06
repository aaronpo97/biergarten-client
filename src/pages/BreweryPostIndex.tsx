import { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getAllBreweryPosts from '../api/getAllBreweryPosts';
import PageHeader from '../components/ui/pageHeader/HeaderBody';
import HeaderTitle from '../components/ui/pageHeader/HeaderTitle';

import BreweryPostI from '../types/BreweryPostI';

interface BreweryPostIndexProps {}

const BreweryPostIndex: FunctionComponent<BreweryPostIndexProps> = () => {
   const [breweryPosts, setBreweryPosts] = useState<BreweryPostI[]>([]);

   useEffect(() => {
      getAllBreweryPosts({ paginated: true }).then((response) => {
         if (!('payload' in response)) {
            return;
         }
         setBreweryPosts(response.payload);
      });
   }, []);

   return (
      <section>
         <PageHeader>
            <HeaderTitle>Breweries</HeaderTitle>
         </PageHeader>

         <Link
            to='/breweries/create'
            className='font-semibold text-3xl  m-3 border '
         >
            Create a Brewery
         </Link>
         <div className='xl:container xl:mx-auto px-100'>
            {breweryPosts.map((breweryPost) => (
               <Link to={`/breweries/${breweryPost.id}`} key={breweryPost.id}>
                  <div className='flex flex-col md:flex-row w-full rounded-lg bg-gray-200 shadow-lg hover:bg-gray-300'>
                     <div className='py-6 flex content-center'>
                        <img
                           className='w-full h-100 lg:h-300 object-cover lg:w-48 rounded-t-lg lg:rounded-none lg:rounded-l-lg'
                           src='https://www.heineken.com/media-us/01pfxdqq/heineken-original-bottle.png?quality=85'
                           alt=''
                        />
                        <div className=''>
                           <h2 className='text-gray-900 text-5xl font-bold mb-2'>
                              {breweryPost.name}
                           </h2>
                           <h3 className='text-gray-900 text-3xl font-medium mb-2'>
                              {breweryPost.location}
                           </h3>
                           <p>{breweryPost.description}</p>
                        </div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default BreweryPostIndex;
