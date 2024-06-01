import { createBrowserRouter } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Layout from "./pages/Layout";
import Feed from "./pages/Feed";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
    { path: "/", element: <Layout />, children: [
        { path: "", element: <Feed /> },
        { path: "login", element: <LogIn /> },
        { path: "register", element: <SignUp />},
        { path: "user/:username", element: <Profile />}
    ] }
])

export default router;