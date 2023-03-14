import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../auth.service";
import {AuthContext} from "../ProtectedRoutes/auth";
import signImage from "../image/key.png";
import Login from "../Login/Login";
import Register from "../Register/Register";
import '../PageLogin/pagelogin.css'

function Logout() {
    const [errors, setErrors] = useState("");
    const context = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        AuthService.logout()
            .then(r => console.log(r))
            .catch((error) => {
                console.log("logout error", error);
                setErrors("logout error");
            });
        setErrors("logged out successfully");
        context.logout()

        //
        //     setTimeout(()=>{
        //         navigate(`/`)
        //     }, 1000)
    }, []);


    return (
        <>
            <section>
                <div className={"PageLoginContainer"}>
                    <div className={"user signInBx"}>
                        <div className={"formBx"}>
                            <div className={"aaa"}>
                                <h4>You're Log out!</h4>
                                <h3> See You later!!!</h3>
                                <Link to={"/login"}>
                                <button> Log in</button>
                                </Link>
                            </div>
                        </div>
                        <div className={"imgBx"}><img src={signImage} alt={"key"}/></div>

                    </div>
                </div>
            </section>


        </>
    )

}

export default Logout;
