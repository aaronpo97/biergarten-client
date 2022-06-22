import { FunctionComponent } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
   placeholder: string;
   formRegister: UseFormRegisterReturn<string>;
   error: FieldError | undefined;
}

const FormTextInput: FunctionComponent<FormInputProps> = ({ placeholder, formRegister, error }) => (
   <input
      type='text'
      placeholder={placeholder}
      className={`form-control block w-full px-4 py-2 text-xl font-normal 
              text-gray-700 bg-white bg-clip-padding border border-solid 
                rounded transition ease-in-out m-0 focus:text-gray-700 
                focus:bg-white focus:outline-none
                ${!error ? 'border-gray-300 focus:border-blue-600' : 'border-red-500 focus:border-red-500'}`}
      {...formRegister}
   />
);

export default FormTextInput;
