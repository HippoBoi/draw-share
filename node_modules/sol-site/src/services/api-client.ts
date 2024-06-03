import axios from "axios";

// http://localhost:8000

export const domain = "https://draw-share-hippo.onrender.com";

export default axios.create({
    baseURL: domain
})