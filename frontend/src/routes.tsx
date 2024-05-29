import { createBrowserRouter } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";

const router = createBrowserRouter([
    { path: "/", element: <Layout />, children: [
        { path: "", element: <Feed /> },
        { path: "login", element: <LogIn /> }
    ] }
])

export default router;