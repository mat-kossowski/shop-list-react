import React, {useState} from "react"
import AuthService from "../auth.service";
import signImage2 from "../image/key2.png";


export default function Register({toggleForm}) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const submitForm = (event) => {
        event.preventDefault();
        AuthService.register(userName, password, email)
            .then(res => {
                console.log("Request complete! response:", res);
                toggleForm()

            }).catch((error) => {
            console.log("login error", error);
            alert("złe dane. spróbuj jeszcze raz")

        });
        setUserName("");
        setPassword("");
        setEmail("");

    }

    return (
        <>
            <div className={"user signupBx"}>
                <div className={"formBx"}>
                    <form onSubmit={submitForm}>
                        <h2>Sign up</h2>
                        <p>User Name</p>
                        <input  type={"text"}
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}/>
                        <p>E-mail address</p>
                        <input  type={"email"}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required/>
                        <p>Password</p>
                        <input  type={"password"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>

                        <input type={"submit"} value={"Registration"}/>

                    </form>
                </div>
                <div className={"imgBx"}><img src={signImage2} alt={"key"}/></div>
            </div>

        </>
    );
}



