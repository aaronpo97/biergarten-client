import { FunctionComponent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext, { AuthContextValue } from '../../contexts/AuthContext';
import NavbarEntry from './NavbarEntry';
import NavButton from './NavButton';

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
   const { currentUser, setCurrentUser } = useContext(
      AuthContext,
   ) as AuthContextValue;

   interface PageInfo {
      title: string;
      path: string;
   }

   const pages: readonly PageInfo[] = currentUser?.id
      ? [
           { path: '/beers', title: 'Beers' },
           { path: '/breweries', title: 'Breweries' },
        ]
      : [
           { path: '/register', title: 'Register' },
           { path: '/login', title: 'Login' },
        ];

   const navigate = useNavigate();

   return (
      <nav className='sticky top-0 bg-gray-900 border-gray-200 px-4 sm:px-4 py-4'>
         <div className='container flex flex-wrap justify-between items-center mx-auto'>
            <Link to='/' className='flex items-center'>
               <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                  The Biergarten App
               </span>
            </Link>

            <div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
               <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
                  {pages.map((page) => (
                     <NavbarEntry page={page} key={page.path} />
                  ))}

                  {currentUser?.id && (
                     <NavButton
                        title='Logout'
                        onClick={() => {
                           localStorage.clear();

                           navigate('/');
                           setCurrentUser({ id: '', username: '' });
                        }}
                     />
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
