import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home.tsx";
import Auth from "./page/Auth.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
