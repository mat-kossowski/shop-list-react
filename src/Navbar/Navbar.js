import React from "react"
import {useAuth} from "../ProtectedRoutes/auth";
import {Link} from "react-router-dom";
import './navbar.css'

export default function Navbar() {
    const auth = useAuth()

    return (
        <>
            <div className={"Navbar"}>

                <div className={"NContainer"}>
                    <div className={"SContainer"}>
                    <div className={"nazwa"}>Lista Zakupów</div>
                    <div className={"lista"}>
                        <a href="/shopLists"><p>Moje Listy</p></a>
                    </div>
                    <div className={"logowanie"}>
                        {!auth.userName ?
                                                <a href={'/login'}>
                                                    <input type={"submit"} value={"Login"}/></a>
                                                :
                                                <a href={'/logout'}>
                                                    <input type={"submit"} value={"Logout"}/></a>
                                            }
                    </div>
                </div>
                </div>
            </div>
{/*<div className="row">*/}
{/*    <div className="col-4"></div>*/}
{/*    <div className="col-4">*/}
{/*        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-bottom">*/}
{/*            <a className="navbar-brand mx-4" href="#">Lista Zakupów</a>*/}
{/*            <button className="navbar-toggler" type="button" data-toggle="collapse"*/}
{/*                    data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"*/}
{/*                    aria-label="Toggle navigation">*/}
{/*                <span className="navbar-toggler-icon"></span>*/}
{/*            </button>*/}
{/*            <div className="collapse navbar-collapse mx-auto" id="navbarNavAltMarkup">*/}
{/*                <div className="navbar-nav ps-2 ">*/}
{/*                    <a className="nav-item nav-link active mt-2 ms-2" href={'#'}>Moje listy </a>*/}
{/*                    {!auth.userName ?*/}
{/*                        <a className="nav-item nav-link disabled ms-5" href={'/login'}>*/}
{/*                            <button className="btn btn-secondary btn-sm mx-2 my-1">Zaloguj się</button></a>*/}
{/*                        :*/}
{/*                        <a className="nav-item nav-link disabled me-auto" href={'/logout'}>*/}
{/*                            <button className="btn btn-secondary btn-sm mx-2 my-1">Wyloguj</button></a>*/}
{/*                    }*/}
{/*                </div>*/}
{/*            </div>*/}
{/*        </nav>*/}

{/*    </div>*/}
{/*    <div className="col-4"></div>*/}

{/*        </div>*/}
        </>
    );
}