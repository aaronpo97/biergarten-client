import { FunctionComponent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavButton from './NavButton';

const NavbarEntry: FunctionComponent<{
   page: { path: string; title: string };
}> = ({ page }) => {
   const { pathname: currentPath } = useLocation();
   const isCurrentPath = page.path === currentPath;

   return (
      <li>
         <Link to={page.path} className='ml-0'>
            <NavButton title={page.title} isCurrentPath={isCurrentPath} />
         </Link>
      </li>
   );
};

export default NavbarEntry;
