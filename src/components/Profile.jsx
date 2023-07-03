import { useContext } from "react";
import { Context } from "../main";
import Loader from "./Loader";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const { loading, isAuth, userDetails } = useContext(Context);
    // console.log(userDetails);

    // console.log(isAuth);

    if (!isAuth) return <Navigate to={"/login"} />;

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
                <h1>{userDetails?.name}</h1>
                <br />
                <p>{userDetails?.email}</p>
                <p>{userDetails?.createdAt}</p>
            </div>
        </div>
    );
};

export default Profile;
