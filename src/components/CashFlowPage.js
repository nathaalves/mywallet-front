import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Page from "../shared/Page";
import StyledButton from "../shared/StyledButton";
import Title from "../shared/Title";


function Register ({date, description, value, type}) {

    let color = null;
    if (type === 'cash-in') color = '#03AC00';
    if (type === 'cash-out') color = '#C70000';
    
    const formatDate = `${date[8]}${date[9]}/${date[5]}${date[6]}`

    return (
        <RegisterContainer color={color} >
            <h3><span>{formatDate}</span>{description}</h3>
            <span>{value}</span>
        </RegisterContainer>
    )
}


export default function CashFlowPage () {

    const navigate = useNavigate();
    const { session } = useContext(UserContext);
    const [cashFlow, setCashFlow] = useState([]);

    let balance = 0;
    let color = null;
    cashFlow.forEach(register => {
        if (register.type === 'cash-in') balance += Number(register.value);
        if (register.type === 'cash-out') balance -= Number(register.value);
        color = (balance < 0) ? '#C70000' : '#03AC00';
    });

    useEffect( () => {

        const API_URL = 'http://localhost:5000';
        const API_ROUTE = '/cash-flow';
        
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
        });
        
    }, []);

    function goToAddCashFlowPage (type) {
        navigate(`/add-cash-flow/${type}`);
    };

    return (
        <Page>
            <Title action='exit' >{`Olá, ${session.userName}`}</Title>
            <Registers color={color}>
                <div>
                    {cashFlow.map(register => 
                        <Register 
                            date={register.date}
                            description={register.description} 
                            value={register.value} 
                            type={register.type}
                        />
                    )}
                </div>
                <div>
                    <h3>SALDO</h3>
                    <span>{balance < 0 ? balance * -1 : balance}</span>
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
            color: ${props => props.color}
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
