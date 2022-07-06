/* eslint-disable react/require-default-props */
import { FunctionComponent } from 'react';

const NavButton: FunctionComponent<{
   title: string;
   onClick?: () => any;
   isCurrentPath?: boolean;
}> = ({ title, onClick, isCurrentPath = false }) => {
   const navButtonFunction = () => (onClick ? onClick() : null);

   return (
      <div
         onKeyUp={() => navButtonFunction()}
         onClick={() => navButtonFunction()}
         role='button'
         tabIndex={0}
         className={`block py-1 px-3 md:hover:bg-transparent hover:text-white md:dark:hover:bg-transparent  ${
            isCurrentPath ? 'text-white' : 'text-gray-400'
         }`}
      >
         <span>{title}</span>
      </div>
   );
};

export default NavButton;
