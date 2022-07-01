import Button from "../shared/Button";
import Input from "../shared/Input";
import Page from "../shared/Page";
import Title from "../shared/Title";
import axios from 'axios';
import { useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import Form from "../shared/Form";

export default function AddCashFlowPage () {


    const { type } = useParams();
    const { session } = useContext(UserContext);
    console.log(`4: ${session}`)
    const [register, setRegister] = useState({
        value: '',
        description: ''
    });

    let pageName = null;
    if (type === 'cash-in') pageName = 'entrada';
    if (type === 'cash-out') pageName = 'saída';

    function handleForm (e) {

        setRegister({
            ...register,
            [e.target.name]: e.target.value
        });
    };

    function submitForm (e) {

        e.preventDefault();

        const API_URL = 'http://localhost:5000';
        const API_ROUTE = '/cash-flow';
        const body = {
            ...register,
            type
        };
        const header = {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        };

        const promise = axios.post(`${API_URL}${API_ROUTE}`, body, header);

        promise
            .then( response => {
                console.log(response.data)
            })
            .catch( error => {
                console.log(error.response.data)
            })

            setRegister({
                value: '',
                description: ''
            });
    };

    return (
        <Page >
            <Title action='back'>{`Nova ${pageName}`}</Title>
            <Form onSubmit={submitForm}>
                <Input placeholder="Valor" name='value' value={register.value} onChange={handleForm} required />
                <Input placeholder="Descrição" name='description' value={register.description} onChange={handleForm} required />
                <Button>{`Salvar ${pageName}`}</Button>
            </Form>
        </Page>
    );
}