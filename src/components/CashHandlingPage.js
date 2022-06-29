import Button from "../shared/Button";
import Input from "../shared/Input";
import Page from "../shared/Page";
import Title from "../shared/Title";

import { useState } from "react";

export default function CashHandlingPage () {

    const [register, setRegister] = useState(null);



    function handleForm (e) {

        setRegister({
            ...register,
            [e.target.name]: e.target.value
        });
    };

    function submitForm (e) {

        e.preventDefaul();

        console.log(register);
    };

    return (
        <Page >
            <Title>Nova entrada</Title>
            <form onSubmit={submitForm}>
                <Input placeholder="Valor" name='value' value={register.value} onChange={handleForm} required />
                <Input placeholder="Descrição" name='description' value={register.description} onChange={handleForm} required />
                <Button>Salvar entrada</Button>
            </form>
        </Page>
    )
}