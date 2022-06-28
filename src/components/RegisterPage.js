import Button from "../shared/Button";
import Input from "../shared/Input";
import Page from "../shared/Page";
import Title from "../shared/Title";

export default function RegisterPage () {

    return (
        <Page>
            <Title>Nova entrada</Title>
            <form action="">
                <Input placeholder="Valor" required />
                <Input placeholder="Descrição" required />
                <Button>Salvar entrada</Button>
            </form>
        </Page>
    )
}