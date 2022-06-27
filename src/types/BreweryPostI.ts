import BeerPostI from './BeerPostI';

export default interface BreweryPostI {
   id: string;
   name: string;
   location: string;
   description: string;
   createdAt: string;
   modifiedAt: string | null;
   beers: BeerPostI[];
}
