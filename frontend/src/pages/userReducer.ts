import { User } from "../services/user-data"

interface changeUser {
    type: "CHANGE";
    user: User;
}

interface removeUser {
    type: "REMOVE";
}

export type userAction = changeUser | removeUser

const userReducer = (state: User | null, action: userAction) => {
    switch(action.type) {
        case "CHANGE":
            return action.user;
        case "REMOVE":
            return null;
    }
    return state;
}

export default userReducer;