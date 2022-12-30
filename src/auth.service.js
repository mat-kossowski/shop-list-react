import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";


const register = (userName, password, email) => {
    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let json = JSON.stringify({
        userName: userName,
        password: password,
        email: email,
    })
    return axios.post(API_URL + "register", json, customConfig)
};

const login = (userName, password) => {

    let customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let json = JSON.stringify({
        userName: userName,
        password: password,
    })
    return axios
        .post(API_URL + "login", json, customConfig)

};

const logout = () => {
    return axios.post(API_URL + "logout").then((response) => {
        return response.data;
    });
};


const AuthService = {
    register,
    login,
    logout,
}



export default AuthService;