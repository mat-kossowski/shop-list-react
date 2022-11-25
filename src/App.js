import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./Home/Home";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Start from "./Start/Start";


const App = () => {

    return (
        <div className="App">
            <h1>Lista zakupów</h1>
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Start />} />


                <Route path="/home" element={<Home />} />

                <Route path="/register" element={<Register />} />

                <Route path="/login" element={<Login />} />
            </Routes>

        </BrowserRouter>
        </div>



    );
}

export default App;
