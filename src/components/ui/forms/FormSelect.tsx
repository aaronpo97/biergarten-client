import { FunctionComponent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormSelectProps {
   options: ReadonlyArray<{ value: string; text: string }>;
   id: string;
   formRegister: UseFormRegisterReturn<string>;
   error: boolean;
   placeholder: string;
   message: string;
}

const FormSelect: FunctionComponent<FormSelectProps> = ({
   options,
   id,
   error,
   formRegister,
   placeholder,
   message,
}) => (
   <select
      id={id}
      className={`form-select block w-full px-3 py-1 h-100 lg:text-lg md:text-lg text-sm rounded-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none ${
         !error
            ? 'border-gray-300 focus:border-blue-600'
            : 'border-red-500 focus:border-red-500'
      }`}
      placeholder={placeholder}
      {...formRegister}
   >
      <option selected value={undefined}>
         {message}
      </option>
      {options.map(({ value, text }) => (
         <option key={value} value={value}>
            {text}
         </option>
      ))}
   </select>
);

export default FormSelect;
