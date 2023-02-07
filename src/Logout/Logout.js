import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthService from "../auth.service";
import {AuthContext} from "../ProtectedRoutes/auth";


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

        setTimeout(()=>{
            navigate(`/`)
        }, 1000)
    }, []);


    return (
        <div>
            <h4>{errors}</h4>
        </div>);
}

export default Logout;
