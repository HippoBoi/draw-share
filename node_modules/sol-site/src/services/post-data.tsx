import apiClient from "./api-client";

interface userDetails {
    id: number;
    username: string;
    email: string;
    picture: string;
}

export interface Post {
    id: number;
    user: string;
    user_details: userDetails;
    title: string;
    description: string;
    image: string;
}

export const getAllPosts = () => {
    return(apiClient.get("/users/posts/"));
};