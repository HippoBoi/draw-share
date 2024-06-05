import axios from "axios";

// https://draw-share-hippo.onrender.com

export const domain = "http://localhost:8000";

export default axios.create({
    baseURL: domain
})