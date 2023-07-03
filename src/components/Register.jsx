import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, server } from "../main";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuth, setIsAuth, loading, setLoading } = useContext(Context);
    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();

        // console.log(name, email, password);

        try {
            const { data } = await axios.post(
                `${server}/users/new`,
                { name, email, password },
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        required
                    />
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
                        Sign Up
                    </button>
                    <h4>OR</h4>
                    <Link to={"/login"}>LOG IN</Link>
                </form>
            </section>
        </div>
    );
};

export default Register;
