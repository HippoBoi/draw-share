import apiClient from "./api-client";

const getUserData = (token: string) => {
    return(apiClient.get("/users/user/", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }));
};

export default getUserData;