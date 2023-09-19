import {useNavigate} from "react-router-dom";
import Footer from "../Components/Footer";
import {useState} from "react";
import Loading from "./Loading/Loading";
import { useClient } from "../Context/ClientContext";
import ErrorMessage from "../Components/ErrorMessage";
import { fetchWithToken } from "../Context/ClientContext";


const LoginForm = () => {
    const {client, login} = useClient();
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null); // Add the error state
    const navigate = useNavigate();


    const loginUser = (user) => {
        return fetchWithToken("POST", "", "/login", user)
            .then(function (res) {
                if (res.status === 404) {
                    throw new Error("Username not found!");
                } else if(res.status === 401){
                    throw new Error("Wrong password!");
                }
                else {
                    const token = res.headers.get("Authorization");
                    localStorage.setItem("Token", token);
                    //return res.json(); // Return the response data instead of the token
                }
            })
            .catch ((error) => {
                throw error; // Re-throw the error to be caught in the parent component
            });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userdata = {};

        for (let [key, value] of formData.entries()) {
            userdata[key] = value;
        }
        handleLoginUser(userdata);
    };

    const onCancel = () => {
        navigate("/")
    };

    const handleLoginUser = (user) => {
        setLoading(true);
        loginUser(user)
            .then((data) => {
                login(data)
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message); // Log the error message to the console
                setError(error.message); // Update the error state with the error message
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <div className="formholder">
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap');
            </style>
            <form className="signupform" onSubmit={onSubmit}>
                <h1 className="headerForms">Log in</h1>
                <div className="control">
                    <label htmlFor="clientName">Username:</label>
                    <input
                        name="clientName"
                        id="clientName"
                    />
                </div>

                <div className="control">
                    <label htmlFor="password">Password:</label>
                    <input
                        name="password"
                        id="password"
                        type={"password"}
                    />
                </div>

                <div className="buttonContainer">
                    <button className="button" type="submit">Login</button>
                    <button className="button" type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
            {error && <ErrorMessage text={error} setError={setError} />} {/* Render ErrorMessage component */}
            <Footer/>
        </div>
    );
};

export default LoginForm;
