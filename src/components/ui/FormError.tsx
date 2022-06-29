import { FunctionComponent } from 'react';

const FormError: FunctionComponent<{ children: string | undefined }> = ({
   children,
}) => (
   <div className={`mt-2 ${!children ? 'invisible' : ''} h-3`} role='alert'>
      <p className='text-red-500 text-xs italic'>{children}</p>
   </div>
);
export default FormError;
