import { createBrowserRouter } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
    { path: "/", element: <Layout />, children: [
        { path: "", element: <Feed /> },
        { path: "login", element: <LogIn /> },
        { path: "register", element: <SignUp />}
    ] }
])

export default router;