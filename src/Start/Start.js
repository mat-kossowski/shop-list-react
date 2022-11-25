import React from "react"
import {Link} from "react-router-dom";



export default function Start() {
    return (
        <>
            <h1>Dupa</h1>
            <span className="navbar-text">
                        <Link className="nav-link float-start" to={'/register'}>
                            <button className="btn btn-secondary btn-sm mx-2 my-1">REGISTRATION</button></Link>
                        <Link className="nav-link float-start" to={'/login'}>
                            <button className="btn btn-secondary btn-sm mx-2 my-1">LOGIN</button></Link>
                    </span>
        </>
    );
}