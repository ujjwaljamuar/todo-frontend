import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main";
import { useContext, useEffect } from "react";

function App() {
    const { setIsAuth, setUserDetails, setLoading } = useContext(Context);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${server}/users/myprofile`, {
                withCredentials: true,
            })
            .then((res) => {
                setUserDetails(res.data.user);
                setIsAuth(true);
                setLoading(false)
            })
            .catch((error) => {
                setUserDetails({});
                setIsAuth(false);
                setLoading(false)
            });
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </div>
    );
}

export default App;
