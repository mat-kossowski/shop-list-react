import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [userName, setUserName] = useState(null)
    useEffect(() => {
        getUser()
            .then(user => {
                if (user.data.id !== null) {
                    setUserName(user.data.username)
                }
            })
    }, [userName])

    const getUser = () => {
        return axios.get("http://localhost:3000/api/auth/current")
    }

    const login = (userName) => {
        setUserName(userName);
    }

    const logout = () => {
        setUserName(null);
    }
    return (
        <AuthContext.Provider value={{userName, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;