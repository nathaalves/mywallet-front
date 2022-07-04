import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Page from "../shared/Page";
import StyledButton from "../shared/StyledButton";
import Title from "../shared/Title";
import { Circles } from 'react-loader-spinner';
import Register from "./Register";

export default function CashFlowPage () {

    const navigate = useNavigate();
    const { session } = useContext(UserContext);
    const [cashFlow, setCashFlow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    let balance = 0;
    cashFlow.forEach(register => {
        let value = register.value?.replace('.', '');
        value = value?.replace(',', '');
        value = value?.replace('R$ ', '');
        value = Number(value)/100
        if (register.type === 'cash-in') balance += Number(value);
        if (register.type === 'cash-out') balance -= Number(value);
    });

    const color = (balance < 0) ? '#C70000' : '#03AC00';
    balance = balance.toFixed(2);

    function renderRegisters() {
        const API_URI = 'https://my-wallet-server-project.herokuapp.com';
        const API_ROUTE = '/cash-flow';

        const header = {
            headers: {
                Authorization: `Bearer ${session.token}`
            }
        };

        const promise = axios.get(`${API_URI}${API_ROUTE}`, header);
        promise.then( response => {
            setCashFlow([...response.data]);
            setIsLoading(false);
        });
    };

    useEffect( () => renderRegisters(), []);

    function goToAddCashFlowPage (type) {
        navigate(`/add-cash-flow/${type}`);
    };

    return (
        <Page>
            <Title action='exit' >{`Olá, ${session.userName}`}</Title>
            <Registers color={color}>
                {isLoading ?
                    <StyledDiv>
                        <Circles color="#8C11BE" height={200} width={200}/>
                    </StyledDiv> :
                    <>
                        <div>
                            {cashFlow.map((register, index) => 
                                <Register 
                                    key={index}
                                    id={register._id}
                                    date={register.date}
                                    description={register.description} 
                                    value={register.value} 
                                    type={register.type}
                                    renderRegisters={renderRegisters}
                                    setIsLoading={setIsLoading}
                                />
                            )}
                        </div>
                        <div>
                            <h3>SALDO</h3>
                            <span>{balance < 0 ? balance * -1 : balance}</span>
                        </div>
                    </>
                }                
            </Registers>
            <ButtonContainer>
                <StyledButton type='cash-in' onClick={ () => goToAddCashFlowPage('cash-in') } />
                <StyledButton type='cash-out' onClick={ () => goToAddCashFlowPage('cash-out') } />
            </ButtonContainer>
        </Page>
    );
};

const StyledDiv = styled.div`
    padding: calc(20% - 100px) calc(50% - 100px);
`;

const Registers = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    padding: 12px;
    margin-bottom: 13px;

    background-color: #FFFFFF;
    border-radius: 5px;

    & > div:first-child {
        width: 100%;
        height: calc(100% - 17px - 12px);
    };

    & > div:last-child {

        display: flex;
        justify-content: space-between;
        width: 100%;

        font-size: 17px;

        h3 {
            font-weight: 700;
            color: #000000;
        };

        span {
            color: ${props => props.color}
        };
    };
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 13px;
    width: 100%;
`;