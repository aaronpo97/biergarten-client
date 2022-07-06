import { FunctionComponent, ReactNode } from 'react';

interface HeaderProps {
   children: ReactNode;
}

const PageHeader: FunctionComponent<HeaderProps> = ({ children }) => (
   <header className='h-96 bg-primary flex items-center justify-center flex-col'>
      {children}
   </header>
);

export default PageHeader;
