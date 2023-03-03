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
            <div className={"navbar"}>
                <div className={"navbarContainer"}>
                    <div className={"navbarSmallContainer"}>
                        <div className={"applicationName"}><a href={'/'}>MOBILNA LISTA ZAKUPÓW</a></div>
                        {context.userName ?
                            <div className={"iconsContainer"}>
                                <div className={"myIcon"}>
                                    <a href={'/shopLists'}>
                                        <img className={"iconImage"} src={icon_heart} alt={'shopping list'}/></a>
                                </div>
                                <div className={"myIcon"}>
                                    <img className={"iconImage"} src={icon_user} alt={'shopping list'}/>
                                </div>
                                <div className={"myIcon"}>
                                    {!context.userName ?
                                        <a href={'/login'}>
                                            <img className={"iconImage"} src={icon_exit} alt={'Login'}/></a>
                                        :
                                        <a href={'/logout'}>
                                            <img className={"iconImage"} src={icon_exit} alt={'Logout'}/></a>
                                    }
                                </div>
                            </div>
                            :
                            <div className={"iconsContainer"}></div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}