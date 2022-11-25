import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";



export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("ROLE_USER");
    const history = useNavigate();


    const submitForm = (event) => {
        event.preventDefault()
            fetch('http://localhost:8080/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                    "userName": userName,
                    "role" : role
                })
            })
                .then(response => response.json())
                .then(response => console.log(JSON.stringify(response)))
            history('/')
        console.log(JSON.stringify({
            "email": email,
            "password": password,
            "userName": userName,
            "role" : role
        }))
    }


    return (
        <>
            <span className="navbar-text">
                        <Link className="nav-link float-start" to={'/'}>
                            <button className="btn btn-secondary btn-sm mx-2 my-1">BACK</button></Link>

                    </span>
            <h1>registration</h1>
            <div className="container">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="forms ">
                            <div className="form register">
                                <span className="title">register</span>
                                <form onSubmit={submitForm}>
                                    <input placeholder={"Enter your  name"} type={"text"}
                                           value={userName}
                                           onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <input  placeholder={"Enter your email"} type={"email"}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}

                                    />
                                    <input placeholder={"Enter your password"} type={"password"}
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <br/>
                                    <button className="btn btn-success">submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



