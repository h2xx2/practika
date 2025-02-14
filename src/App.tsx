import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home.tsx";
import Auth from "./page/Auth.tsx";
import Registration from "./page/Registration.tsx";
import Reviews from "./page/Reviews.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/review" element={<Reviews />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
