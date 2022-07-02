import { FunctionComponent } from 'react';

interface FormButtonProps {
   children: string;
}

const FormButton: FunctionComponent<FormButtonProps> = ({ children }) => (
   <button
      type='submit'
      className='inline-block py-3 mt-4 bg-gray-700 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-gray-800 hover:shadow-lg focus:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out w-full'
      data-mdb-ripple='true'
      data-mdb-ripple-color='light'
   >
      {children}
   </button>
);

export default FormButton;
