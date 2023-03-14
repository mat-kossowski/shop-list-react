import React, {useContext, useState} from "react"
import AuthService from "../auth.service";

import {useNavigate, useLocation} from "react-router-dom";
import signImage from "../image/key.png";
import {AuthContext} from "../ProtectedRoutes/auth";

export default function Login({toggleForm}) {
    const context = useContext(AuthContext)
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
                handleLogin(userName)
            }).catch((error) => {
            console.log("login error", error);

        });
        setUserName("");
        setPassword("");
        const handleLogin = (userName) => {
            context.login(userName)
            navigate(redirectPath, {replace: true})
        }
    }


    return (
        <>
            <div className={"user signInBx"}>
                <div className={"imgBx"}><img src={signImage} alt={"key"}/></div>
                <div className={"formBx"}>
                    <form onSubmit={submitForm}>
                        <h2>Log in</h2>
                        <p>User Name</p>
                        <input  type={"text"}
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}
                               required/>
                        <p>Password</p>
                        <input type={"password"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                        <input type={"submit"} value={"Log in"}/>

                        <p className={"signup"}>Don't have account any yet? <br />
                            <a href={"#"}
                               onClick={() => toggleForm()}> Sign
                                up!</a>
                        </p>
                    </form>
                </div>
            </div>


        </>
    );
}