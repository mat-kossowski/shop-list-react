import {useState, createContext, useContext, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [userName, setUserName] = useState(null)

    useEffect(() => {
        getUser()
            .then(user => {
                if (user.data.id !== null) {
                    setUserName(user.data.username)
                    console.log("auth")
                    console.log(user.data.username)
                    console.log()

                }
            })
    }, [])



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

export const useAuth = () => {
    return useContext(AuthContext)
}