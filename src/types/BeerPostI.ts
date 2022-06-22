import BreweryPostI from './BreweryPostI';

export default interface BeerPostI {
   id: string;
   name: string;
   description: string;
   type: string;
   abv: number;
   ibu: number;
   brewery: BreweryPostI;
   createdAt: string;
   modifiedAt: string | null;
   postedBy: {
      id: string;
      username: string;
   };
}
