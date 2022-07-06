import { FunctionComponent } from 'react';

interface FormButtonProps {
   children: string;
}

const FormButton: FunctionComponent<FormButtonProps> = ({ children }) => (
   <button
      type='submit'
      className='btn w-full btn-primary text-primary-content mt-4'
   >
      {children}
   </button>
);

export default FormButton;
