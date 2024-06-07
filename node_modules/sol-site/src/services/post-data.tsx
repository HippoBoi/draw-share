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

export const getPostById = (postId: number) => {
    return(apiClient.get(`/users/posts/${postId}`));
};

export const getPostByQuery = (searchQuery: string) => {
    return(apiClient.get(`/users/posts/search/?q=${searchQuery}`));
}