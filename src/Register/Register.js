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
                        <h2>Create an account</h2>
                        <input placeholder={"Enter your  name"} type={"text"}
                               value={userName}
                               onChange={(e) => setUserName(e.target.value)}/>
                        <input placeholder={"Enter your email"} type={"email"}
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               required/>
                        <input placeholder={"Enter your password"} type={"password"}
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required/>
                        <input type={"submit"} value={"Sign Up"}/>
                        <p className={"signup"}>Already have an account? <a href={'/login'}
                                                                            onClick={() => toggleForm()}>Sign in.</a>
                        </p>
                    </form>
                </div>
                <div className={"imgBx"}><img src={signImage2} alt={"key"}/></div>
            </div>

        </>
    );
}



