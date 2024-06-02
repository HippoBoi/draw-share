import { useNavigate } from "react-router-dom";
import apiClient from "./api-client";
import { useToast } from "@chakra-ui/react";

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