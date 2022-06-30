import Page from "../shared/Page";
import Input from "../shared/Input";
import logo from '../assets/images/logo.svg';
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import SubText from "../shared/SubText";
import { useState, useEffect, useContext } from 'react';
import UserContext from "../contexts/UserContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginPage () {

    useEffect ( () => {
        if (localStorage.getItem('MyWalletSesseion') !== null) {

            const API_URL = 'http://localhost:5000';
            const API_ROUTE = '/login';


            //navigate('/historic');
        };
    }, []);
    
    const navigate = useNavigate();
    const { session, setSession } = useContext(UserContext);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    function handleForm (e) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    function submitForm (e) {

        e.preventDefault();

        const API_URL = 'http://localhost:5000';
        const API_ROUTE = '/login';

        const promise = axios.post(`${API_URL}${API_ROUTE}`, credentials);

        promise.then( response => {
            setSession({ ...response.data });
            localStorage.setItem('MyWalletSession', JSON.stringify(session));
            navigate('/cash-flow');
        });
        promise.catch( error => {
                console.log(error.response.data)
        });
    };

    return (
        <Page centeredContent >
            <Logo src={logo} alt='logo' />
            <form onSubmit={submitForm} >
                <Input placeholder="E-mail" value={credentials.email} name='email' onChange={handleForm} />
                <Input placeholder="Senha" value={credentials.password} name='password' onChange={handleForm} />
                <Button>Entrar</Button>
            </form>
            <SubText to='/registration'>Primeira vez? Cadastre-se!</SubText>
        </Page>
    );
}