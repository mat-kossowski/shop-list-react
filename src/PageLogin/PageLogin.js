import React from "react"
import './pagelogin.css'
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function PageLogin() {


    let container;
    let section;
    const toggleForm=()=>{
        section = document.querySelector('section');
        container = document.querySelector('.PageLoginContainer');
        container.classList.toggle('active');
        section.classList.toggle('active');
    };
    return (
        <>
            <section>
            <div className={"PageLoginContainer"}>
                <Login toggleForm={toggleForm}/>
                <Register toggleForm={toggleForm}/>
            </div>
        </section>

        </>
    );
}