import styled from "styled-components";
import Page from "../shared/Page";
import StyledButton from "../shared/StyledButton";
import Title from "../shared/Title";


function Register ({date, description, value}) {

    return (
        <RegisterContainer>
            <h3><span>{date}</span>{description}</h3>
            <span>{value}</span>
        </RegisterContainer>
    )
}


export default function HistoricPage () {

    return (
        <Page>
            <Title withButton >Olá, Fulano</Title>
            <Registers>
                <div>
                    <Register date='21/08' description='Natha' value='1.000,00' />
                    <Register date='21/08' description='Natha' value='1.000,00' />
                    <Register date='21/08' description='Natha' value='1.000,00' />
                </div>
                <div>
                    <h3>SALDO</h3>
                    <span>3.000,00</span>
                </div>
            </Registers>
            <ButtonContainer>
                <StyledButton action='add' />
                <StyledButton action='remove' />
            </ButtonContainer>
        </Page>
    )
}

const Registers = styled.div`
    
    width: 100%;
    height: 100%;
    padding: 12px;
    margin-bottom: 13px;

    background-color: #FFFFFF;
    border-radius: 5px;

    & > div:first-child {
        width: 100%;
        height: calc(100% - 17px - 12px);
    }

    & > div:last-child {
        display: flex;
        justify-content: space-between;
        width: 100%;


        font-size: 17px;

        h3 {
            font-weight: 700;
            color: #000000;
        }

        span {

        }
    }
`;

const RegisterContainer = styled.div`

    display: flex;
    justify-content: space-between;

    margin-bottom: 12px;
    font-weight: 400;
    font-size: 16px;v

    h3 {
        color: #000000;
    }

    h3 > span {
        color: #C6C6C6;
    }

    span {
        margin-right: 10px;
        color: ${props => props.color}
    }
    
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 13px;
    width: 100%;
`;
