import { useContext, useEffect } from "react";
import { Context } from "../main";
import Loader from "./Loader";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const { loading, isAuth, userDetails } = useContext(Context);
    // console.log(userDetails);

    // console.log(isAuth);

    if (!isAuth) return <Navigate to={"/login"} />;

    const name = userDetails.name;
    const email = userDetails.email;
    const createdAt = userDetails.createdAt;

    useEffect(() => {}, [name, email, createdAt]);

    return loading ? (
        <Loader />
    ) : (
        <div className="profile">
            <div>
                <h1>Name: &nbsp;</h1>
                <br />
                <p>Email ID: </p>
                <p>Created on: </p>
            </div>
            <div>
                <h1>{name}</h1>
                <br />
                <p>{email}</p>
                <p>{createdAt}</p>
            </div>
        </div>
    );
};

export default Profile;
