import apiClient from "./api-client";

export interface User {
    username: string;
    email: string;
    picture?: string;
}

const getUserData = (token: string) => {
    return(apiClient.get("/users/user/", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }));
};

export default getUserData;