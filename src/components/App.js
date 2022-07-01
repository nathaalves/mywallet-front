import GlobalStyles from "../assets/styles/GlobalStyles"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import CashFlowPage from "./CashFlowPage";
import AddCashFlowPage from "./AddCashFlowPage";
import UserContext from "../contexts/UserContext";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function App () {

    const [session, setSession] = useState(JSON.parse(localStorage.getItem('MyWalletSession')));

    return (
        <UserContext.Provider value={{
            session,
            setSession
        }}>
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path='/registration' element={ <RegistrationPage /> } />
                    <Route path='/cash-flow' element={ <CashFlowPage /> } />
                    <Route path='/add-cash-flow/:type' element={ <AddCashFlowPage /> } />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}