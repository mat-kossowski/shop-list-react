import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import AuthService from "../auth.service";
import {useAuth} from "../ProtectedRoutes/auth";

import {useNavigate, useLocation} from "react-router-dom";
import signImage from "../image/key.png";

export default function Login({toggleForm}) {

    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/'
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (event) => {
        event.preventDefault()
        AuthService.login(userName, password)
            .then(res => {
                console.log("Request complete! response:", res);
                console.log("login")
                console.log(userName)
                handleLogin(userName)
            }).catch((error) => {
            console.log("login error", error);

        });
        setUserName("");
        setPassword("");
        const handleLogin = (userName) => {
            console.log("h-login")
            console.log(userName)

            auth.login(userName)
            navigate(redirectPath, {replace: true})
        }

    }


    return (
        <>
            <div className={"user signinBx"}>
                <div className={"imgBx"}><img src={signImage} alt={"key"}/></div>
                <div className={"formBx"}>
                    <form onSubmit={submitForm}>
                        <h2>Sign In</h2>
                        <input placeholder={"UserName"} type={"text"}
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}
                               required/>
                        <input placeholder={"Password"} type={"password"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                        <input type={"submit"} value={"Login"}/>
                        <p className={"signup"}>don't have an account? <a href={"#"} onClick={() => toggleForm()}>Sign
                            up.</a></p>
                    </form>
                </div>
            </div>


        </>
    );
}