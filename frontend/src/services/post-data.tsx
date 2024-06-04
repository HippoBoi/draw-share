import apiClient from "./api-client";

export interface Post {
    id: number;
    title: string;
    user: string;
    imageURL: string;
}

export const getAllPosts = () => {
    return(apiClient.get("/users/posts/"));
};