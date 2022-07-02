import { FunctionComponent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormTextAreaProps {
   placeholder?: string;
   formRegister: UseFormRegisterReturn<string>;
   error: boolean;
   id: string;
   rows: number;
}

const FormTextArea: FunctionComponent<FormTextAreaProps> = ({
   placeholder = '',
   formRegister,
   error,
   id,
   rows,
}) => (
   <textarea
      id={id}
      placeholder={placeholder}
      className={`block w-full px-3 py-1 resize-none lg:text-lg md:text-lg text-sm rounded-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none ${
         !error
            ? 'border-gray-300 focus:border-blue-600'
            : 'border-red-500 focus:border-red-500'
      }`}
      {...formRegister}
      rows={rows}
   />
);

FormTextArea.defaultProps = {
   placeholder: '',
};

export default FormTextArea;
