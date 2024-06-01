import axios from "axios";

export const domain = "http://localhost:8000";

export default axios.create({
    baseURL: domain
})