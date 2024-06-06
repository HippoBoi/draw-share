import axios from "axios";

// https://draw-share-hippo.onrender.com http://localhost:8000

export const domain = "https://draw-share-hippo.onrender.com";

export default axios.create({
    baseURL: domain
})