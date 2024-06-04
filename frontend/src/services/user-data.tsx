import apiClient from "./api-client";

export interface User {
    username: string;
    email: string;
    picture?: string;
}

export const getUserData = (token: string) => {
    return(apiClient.get("/users/user/", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }));
};

export const getUserDataByName = (username: string) => {
    return (apiClient.get(`/users/user/${username}`));
}