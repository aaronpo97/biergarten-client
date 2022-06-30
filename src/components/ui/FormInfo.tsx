import { FunctionComponent } from 'react';

/** A container for both the form error and form label. */
interface FormInfoProps {
   children: Array<JSX.Element> | JSX.Element;
}

const FormInfo: FunctionComponent<FormInfoProps> = ({ children }) => (
   <div className='flex justify-between'>{children}</div>
);

export default FormInfo;
