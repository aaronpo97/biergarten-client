/* eslint-disable react/require-default-props */
import { FunctionComponent } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps {
   placeholder?: string;
   formValidationSchema: UseFormRegisterReturn<string>;
   error: boolean;
   // eslint-disable-next-line react/require-default-props
   type: 'email' | 'password' | 'text' | 'date';
   id: string;
   height?: string;
}

const FormTextInput: FunctionComponent<FormInputProps> = ({
   placeholder = '',
   formValidationSchema,
   error,
   type,
   id,
}) => (
   <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`form-input block w-full px-3 py-1 lg:text-lg md:text-lg text-sm rounded-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  ${
         !error
            ? 'border-gray-300 focus:border-blue-600'
            : 'border-red-800 focus:border-red-800'
      }`}
      {...formValidationSchema}
   />
);

export default FormTextInput;
