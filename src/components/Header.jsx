import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";

const Header = () => {
    const { isAuth, setIsAuth, loading, setLoading } = useContext(Context);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${server}/users/logout`, {
                withCredentials: true,
            });

            toast.success(data.message);
            setIsAuth(false);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            setIsAuth(true);
            setLoading(false);
        }
    };
    return (
        <nav className="header">
            <div>
                <h2>Todo App.</h2>
            </div>

            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>

                {isAuth ? (
                    <button
                        disabled={loading}
                        className="btn"
                        onClick={logoutHandler}
                    >
                        Log Out
                    </button>
                ) : (
                    <Link to={"/login"}>Login</Link>
                )}
            </article>
        </nav>
    );
};

export default Header;
