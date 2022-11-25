import React, {useState} from "react"
import {Link} from "react-router-dom";




export default function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const submitForm =(event) =>{
        event.preventDefault()
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email,
                "password": password
            })
        })
            .then(response => {
                console.log(response)
                localStorage.setItem('user', response.data)

                return response.json()
            })
            .then(response => console.log(JSON.stringify(response)))
    }


    return (
        <>
            <span className="navbar-text">
                        <Link className="nav-link float-start" to={'/'}>
                            <button className="btn btn-secondary btn-sm mx-2 my-1">BACK</button></Link>

                    </span>


            <div className="containerr">
                <div className="forms">
                    <div className="form register">
                        <span className="title">login</span>
                        <form onSubmit={submitForm}>
                            <input placeholder={"Email"} type={"text"}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                            />
                            <input placeholder={"Password"} type={"password"}
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <button >submit</button>
                            <a id="reg" href="/register">Register Now</a>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}