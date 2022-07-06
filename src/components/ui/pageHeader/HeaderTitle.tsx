import { FunctionComponent } from 'react';

interface HeaderTitleProps {
   children: string;
}

const HeaderTitle: FunctionComponent<HeaderTitleProps> = ({ children }) => (
   <h1 className='font-semibold text-7xl text-white py-6'>{children}</h1>
);

export default HeaderTitle;
