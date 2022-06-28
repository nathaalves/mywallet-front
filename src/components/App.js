import GlobalStyles from "../assets/styles/GlobalStyles"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

export default function App () {

    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={ <LoginPage /> } />
                    <Route path='/registration' element={ <RegisterPage /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}