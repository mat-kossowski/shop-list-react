import React, {useContext} from "react"
import './start.css'
import {Link} from "react-router-dom";
import {AuthContext} from "../ProtectedRoutes/auth";


export default function Start() {
    const context = useContext(AuthContext)
    return (
        <>
            <div className={"StartContainer"}>
                {context.userName ?

                    <Link to={"/shopList/new"}>
                        <button className={"NewListButton"}>Nowa Lista Zakupów</button>
                    </Link>

                    :
                    <Link to={"/login"}>
                        <button className={"NewListButton"}>Zaloguj się</button>
                    </Link>
                }

            </div>
        </>
    );
}