import { FunctionComponent } from "react";

// eslint-disable-next-line react/require-default-props
const NavButton: FunctionComponent<{ title: string; onClick?: () => any }> = ({ title, onClick }) => {
   const navButtonFunction = () => (onClick ? onClick() : null);
   return (
      <div
         onKeyUp={() => navButtonFunction()}
         onClick={() => navButtonFunction()}
         role='button'
         tabIndex={0}
         className='block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
      >
         <span>{title}</span>
      </div>
   );
};

export default NavButton;
