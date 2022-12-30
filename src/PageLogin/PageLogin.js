import React from "react"
import singImage from '../image/key.png'
import singImage2 from '../image/key2.png'
import './pagelogin.css'
import Login from "../Login/Login";
import Register from "../Register/Register";

export default function PageLogin() {


    let container;
    let section;
    const toggleForm=()=>{
        section = document.querySelector('section');
        container = document.querySelector('.LContainer');
        container.classList.toggle('active');
        section.classList.toggle('active');
    };
    return (
        <>
            <section>
            <div className={"LContainer"}>
                <Login toggleForm={toggleForm}/>
                <Register toggleForm={toggleForm}/>
            </div>
        </section>

        </>
    );
}