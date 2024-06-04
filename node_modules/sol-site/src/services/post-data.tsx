import apiClient from "./api-client";

export interface Post {
    id: number;
    user: string;
    title: string;
    description: string;
    image: string;
}

export const getAllPosts = () => {
    return(apiClient.get("/users/posts/"));
};