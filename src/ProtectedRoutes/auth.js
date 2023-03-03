import React, {useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const [userName, setUserName] = useState(null)
    const [sortAlphabet, setSortAlphabet] = useState(null)
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
    const getStatusSort= (shopListId) =>{
        return axios.get("http://localhost:3000/api/shoplist/sort/" + shopListId)
    }

    const login = (userName) => {
        setUserName(userName);
    }
    const alphabet = (shopListId) => {
        getStatusSort(shopListId)
            .then(shopList =>{
                setSortAlphabet(shopList.data)
            })
    }
    const category = () => {
        setSortAlphabet(false);
    }

    const logout = () => {
        setUserName(null);
    }
    return (
        <AuthContext.Provider value={{userName, category, login, logout,alph: alphabet,sortAlph: sortAlphabet}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;