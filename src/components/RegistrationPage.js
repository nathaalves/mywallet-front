import Logo from "../shared/Logo";
import Page from "../shared/Page";
import logo from '../assets/images/logo.svg'
import Input from "../shared/Input";
import Button from "../shared/Button";
import SubText from "../shared/SubText";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Form from "../shared/Form";

export default function RegistrationPage () {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isActive, setIsActive] = useState(true);

    function handleForm (e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    function submitForm (e) {
        
        e.preventDefault();

        setIsActive(false);
        const API_URI = 'https://my-wallet-server-project.herokuapp.com';
        const API_ROUTE = '/registration';

        const promise = axios.post(`${API_URI}${API_ROUTE}`, user);
        promise.then( () => {
            alert('Cadastro realizado com sucesso!');
            navigate('/');
        });
    };

    return (
        <Page centeredContent >
            <Logo src={logo} alt='logo' />
            <Form onSubmit={isActive ? submitForm : null}>
                <Input placeholder="Nome" name='name' onChange={handleForm} disabled={!isActive} required />
                <Input placeholder="E-mail" name='email' onChange={handleForm} disabled={!isActive} required />
                <Input placeholder="Senha" name='password' onChange={handleForm} disabled={!isActive} required />
                <Input placeholder="Confirmar a senha" name='pwConfirm' onChange={handleForm} disabled={!isActive} required />
                <Button isActive={isActive} >Cadastrar</Button>
            </Form>
            <SubText to='/' >Já tem uma conta? Entre agora!</SubText>
        </Page>
    );
};