import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/App.scss";
import { createContext, useState } from "react";

export const server = "https://todo-backend-qa3h.onrender.com/api/v1";

export const Context = createContext({ isAuth: false });

const AppWrapper = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    return (
        <Context.Provider
            value={{
                isAuth,
                setIsAuth,
                loading,
                setLoading,
                userDetails,
                setUserDetails,
            }}
        >
            <App />
        </Context.Provider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);
