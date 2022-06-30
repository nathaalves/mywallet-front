import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
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


export default function CashFlowPage () {

    const navigate = useNavigate();
    const { session } = useContext(UserContext);
    const [cashFlow, setCashFlow] = useState([]);

    useEffect( () => {

        const API_URL = 'http://localhost:5000';
        const API_ROUTE = '/cash-flow';
        console.log(session.token)
        const promise = axios.get(
            `${API_URL}${API_ROUTE}`,
            {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            }
        );

        promise.then( response => {
            setCashFlow([...response.data]);
            console.log(response.data)
        });
        
    }, []);

    function goToAddCashFlowPage (type) {
        navigate(`/add-cash-flow/${type}`);
    };

    return (
        <Page>
            <Title withButton >Olá, Fulano</Title>
            <Registers>
                <div>
                    {cashFlow.map(register => <Register date='21/08' description={register.description} value={register.value} />)}
                </div>
                <div>
                    <h3>SALDO</h3>
                    <span>3.000,00</span>
                </div>
            </Registers>
            <ButtonContainer>
                <StyledButton type='cash-in' onClick={ () => goToAddCashFlowPage('cash-in') } />
                <StyledButton type='cash-out' onClick={ () => goToAddCashFlowPage('cash-out') } />
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
