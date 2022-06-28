import Page from "../shared/Page";
import Input from "../shared/Input";
import logo from '../assets/images/logo.svg';
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import SubText from "../shared/SubText";

export default function LoginPage () {

    function handleForm () {

    }

    return (
        <Page centeredContent >
            <Logo src={logo} alt='logo' />
            <form onSubmit={handleForm} >
                <Input placeholder="E-mail" />
                <Input placeholder="Senha" />
                <Button>Entrar</Button>
            </form>
            <SubText to='/registration'>Primeira vez? Cadastre-se!</SubText>
        </Page>
    )
}