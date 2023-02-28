import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {
    const {shopListId} = useParams();
    const [userName, setUserName] = useState(null)
    const [sortAlph, setSortAlph] = useState(null)
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
    const alph = (shopListId) => {
        getStatusSort(shopListId)
            .then(shopList =>{
                setSortAlph(shopList.data)
            })
    }
    const category = (shopListId) => {
        setSortAlph(false);
    }

    const logout = () => {
        setUserName(null);
    }
    return (
        <AuthContext.Provider value={{userName, category, login, logout,alph,sortAlph}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;