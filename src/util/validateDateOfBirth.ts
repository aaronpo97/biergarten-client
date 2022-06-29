import intervalToDuration from 'date-fns/intervalToDuration';
import isValid from 'date-fns/isValid';

type ValidateDOBFunction = (dateOfBirth: Date, minAge: number) => boolean;

const validateDateOfBirth: ValidateDOBFunction = (dateOfBirth, minAge = 19) => {
   const isValidDate = isValid(dateOfBirth);

   if (!isValidDate) {
      throw new TypeError('Could not parse date.');
   }

   const age = intervalToDuration({
      start: dateOfBirth,
      end: Date.now(),
   });

   const ageInYears = age.years;

   if (!ageInYears || ageInYears < minAge) {
      return false;
   }
   return true;
};

export default validateDateOfBirth;
