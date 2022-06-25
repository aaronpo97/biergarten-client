import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import NavButton from './NavButton';

const NavbarEntry: FunctionComponent<{ page: { path: string; title: string } }> = ({ page }) => (
   <li>
      <Link to={page.path}>
         <NavButton title={page.title} />
      </Link>
   </li>
);

export default NavbarEntry;
