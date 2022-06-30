import { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for a styled form error message.
 *
 * @example <FormError>Something went wrong!</FormError>
 */
const FormError: FunctionComponent<{ children: string | undefined }> = ({
   children,
}) => (
   <div className='h-3'>
      {children ? (
         <div
            className='text-red-800 text-xs italic my-1 font-semibold'
            role='alert'
         >
            <FontAwesomeIcon icon={faTriangleExclamation} className='mr-2' />
            {children}
         </div>
      ) : null}
   </div>
);
export default FormError;
