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
import Form from "../shared/Form";

export default function LoginPage () {
    
    const navigate = useNavigate();
    const { session, setSession } = useContext(UserContext);
    const [isActive, setIsActive] = useState(true);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect ( () => {

        if (session !== null) {
            
            const API_URI = 'https://my-wallet-server-project.herokuapp.com';
            const API_ROUTE = '/session';

            const header = {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            };

            const promise = axios.post(`${API_URI}${API_ROUTE}`, null, header);
            promise.then( () => navigate('/cash-flow'));
        };
    }, []);

    function handleForm (e) {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    function submitForm (e) {

        e.preventDefault();

        setIsActive(false)
        const API_URI = 'https://my-wallet-server-project.herokuapp.com';
        const API_ROUTE = '/login';

        const promise = axios.post(`${API_URI}${API_ROUTE}`, credentials);

        promise.then( response => {
            setSession({ ...response.data });
            localStorage.setItem('MyWalletSession', JSON.stringify(response.data));
            navigate('/cash-flow');
        });
    };

    return (
        <Page centeredContent >
            <Logo src={logo} alt='logo' />
            <Form onSubmit={isActive ? submitForm : null} >
                <Input placeholder="E-mail" value={credentials.email} name='email' onChange={handleForm} disabled={!isActive} required />
                <Input placeholder="Senha" value={credentials.password} name='password' onChange={handleForm} disabled={!isActive} required />
                <Button isActive={isActive} >Entrar</Button>
            </Form>
            <SubText to='/registration'>Primeira vez? Cadastre-se!</SubText>
        </Page>
    );
};