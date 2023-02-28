import React, {useContext} from "react"
import './navbar.css'
import icon_heart from '../../src/image/shopping-heart.png'
import icon_user from '../../src/image/user.png'
import icon_exit from '../../src/image/exit.png'
import {AuthContext} from "../ProtectedRoutes/auth";

export default function Navbar() {

    const context = useContext(AuthContext)
    return (
        <>
            <div className={"Navbar"}>
                <div className={"NavbarContainer"}>
                    <div className={"NavbarSmallContainer"}>
                        <div className={"ApplicationName"}><a href={'/'}>MOBILNA LISTA ZAKUPÓW</a></div>
                        {context.userName ?
                            <div className={"IconsContainer"}>
                                <div className={"MyIcon"}>
                                    <a href={'/shopLists'}>
                                        <img className={"IconImage"} src={icon_heart} alt={'shopping list'}/></a>
                                </div>
                                <div className={"MyIcon"}>
                                    <img className={"IconImage"} src={icon_user} alt={'shopping list'}/>
                                </div>
                                <div className={"MyIcon"}>
                                    {!context.userName ?
                                        <a href={'/login'}>
                                            <img className={"IconImage"} src={icon_exit} alt={'Login'}/></a>
                                        :
                                        <a href={'/logout'}>
                                            <img className={"IconImage"} src={icon_exit} alt={'Logout'}/></a>
                                    }
                                </div>
                            </div>
                            :
                            <div className={"IconsContainer"}></div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}