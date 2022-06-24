import { createContext, Dispatch, SetStateAction } from 'react';

export interface CurrentUserState {
   username: string;
   id: string;
}

export interface AuthContextValue {
   currentUser: CurrentUserState;
   setCurrentUser: Dispatch<SetStateAction<CurrentUserState>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default AuthContext;
