import GlobalStyles from "../assets/styles/GlobalStyles"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import HistoricPage from "./HistoricPage";
import RegisterPage from "./RegisterPage";

export default function App () {

    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path='/registration' element={ <RegistrationPage /> } />
                    <Route path='/historic' element={ <HistoricPage /> } />
                    <Route path='/register/:action' element={ <RegisterPage /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}