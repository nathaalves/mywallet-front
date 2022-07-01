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

    function handleForm (e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    function submitForm (e) {
        e.preventDefault();

        const API_URL = 'http://localhost:5000';
        const ROUT = '/registration';

        const promise = axios.post(`${API_URL}${ROUT}`, user);

        promise
            .then( () => {
                navigate('/');
            })
            .catch( (error) => {
                //console.log(error.response.data)
        });
    };

    return (
        <Page centeredContent >
            <Logo src={logo} alt='logo' />
            <Form onSubmit={submitForm}>
                <Input placeholder="Nome" name='name' onChange={handleForm} required />
                <Input placeholder="E-mail" name='email' onChange={handleForm} required />
                <Input placeholder="Senha" name='password' onChange={handleForm} required />
                <Input placeholder="Confirmar a senha" name='pwConfirm' onChange={handleForm} required />
                <Button>Cadastrar</Button>
            </Form>
            <SubText to='/' >Já tem uma conta? Entre agora!</SubText>
        </Page>
    )
}