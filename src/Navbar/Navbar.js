import React, {useContext} from "react"
import './navbar.css'
import heart from '../../src/image/shopping-heart.png'
import user from '../../src/image/user.png'
import exit from '../../src/image/exit.png'
import {AuthContext} from "../ProtectedRoutes/auth";

export default function Navbar() {

    const context = useContext(AuthContext)
    return (
        <>
            <div className={"Navbar"}>

                <div className={"NContainer"}>
                    <div className={"SContainer"}>

                        <div className={"nazwa"}><a href={'/'}>MOBILNA LISTA ZAKUPÓW</a></div>


                        {context.userName ?

                            <div className={"MyIcons"}>
                                <div className={"MyIcon"}>
                                    <a href={'/shopLists'}>
                                        <img className={"IconImage"} src={heart} alt={'shopping list'}/></a>
                                </div>
                                <div className={"MyIcon"}>
                                    <img className={"IconImage"} src={user} alt={'shopping list'}/>
                                </div>
                                <div className={"MyIcon"}>

                                    {!context.userName ?

                                        <a href={'/login'}>
                                            <img className={"IconImage"} src={exit} alt={'wyloguj się'}/></a>
                                        :
                                        <a href={'/logout'}>
                                            <img className={"IconImage"} src={exit} alt={'wyloguj się'}/></a>
                                    }
                                </div>
                            </div>
                            :
                            <div className={"MyIcons"}></div>
                        }

                    </div>
                </div>
            </div>

        </>
    );
}