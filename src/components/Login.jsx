import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuth, setIsAuth, loading, setLoading } = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();

        // console.log(name, email, password);

        setLoading(true);
        try {
            const { data } = await axios.post(
                `${server}/users/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            toast.success(data.message);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            setIsAuth(false);
            setLoading(false);
        }
    };

    if (isAuth) return <Navigate to={"/"} />;

    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button disabled={loading} type="submit">
                        Log in
                    </button>
                    <h4>OR</h4>
                    <Link to={"/register"}>SIGN UP</Link>
                </form>
            </section>
        </div>
    );
};

export default Login;
