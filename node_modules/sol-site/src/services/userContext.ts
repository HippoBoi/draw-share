import { Dispatch } from "react";
import { User } from "./user-data";
import React from "react";
import { userAction } from "../pages/userReducer";

interface UserContextType {
    user: User | null;
    dispatch: Dispatch<userAction>;
}

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export default UserContext;