import Logo from "../shared/Logo";
import Page from "../shared/Page";
import logo from '../assets/images/logo.svg'
import Input from "../shared/Input";
import Button from "../shared/Button";
import SubText from "../shared/SubText";

export default function RegisterPage () {

    function handleForm () {

    }

    return (
        <Page >
            <Logo src={logo} alt='logo' />
            <form onSubmit={handleForm}>
                <Input placeholder="Nome" required />
                <Input placeholder="E-mail" required />
                <Input placeholder="Senha" required />
                <Input placeholder="Confirmar a senha" required />
                <Button>Cadastrar</Button>
            </form>
            <SubText to='/' >Já tem uma conta? Entre agora!</SubText>
        </Page>
    )
}