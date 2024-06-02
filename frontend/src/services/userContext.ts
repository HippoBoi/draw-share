import { Dispatch } from "react";
import { User } from "./user-data";
import { userAction } from "../pages/userReducer";
import React from "react";

interface UserContextType {
    user: User | null;
    dispatch: Dispatch<userAction>;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export default UserContext;