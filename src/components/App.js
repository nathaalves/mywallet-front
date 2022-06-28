import GlobalStyles from "../assets/styles/GlobalStyles"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HistoricPage from "./HistoricPage";

export default function App () {

    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path='/registration' element={ <RegisterPage /> } />
                    <Route path='/historic' element={ <HistoricPage /> } />
                </Routes>
            </BrowserRouter>
        </>
    )
}