import styled from 'styled-components';
import axios from 'axios';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import close from '../assets/images/close.svg';

export default function Register ({date, description, value, type, id, renderRegisters, setIsLoading}) {

    const { session } = useContext(UserContext);

    let color = null;
    if (type === 'cash-in') color = '#03AC00';
    if (type === 'cash-out') color = '#C70000';
    
    const formatDate = `${date[8]}${date[9]}/${date[5]}${date[6]}`;

    const formatCurrency = function(amount) {
        amount = amount?.replace('.', '');
        amount = amount?.replace(',', '');
        amount = amount?.replace('R$ ', '');
        amount = Number(amount)/100;
        return parseFloat(amount).toFixed(2).replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    };

    function handleClick (e) {

        if (window.confirm('Você realmente deseja excluir esse registro?')) {
            setIsLoading(true);

            const id = e.target.id;
    
            const API_URI = 'https://my-wallet-server-project.herokuapp.com';
            const API_ROUTE = `/cash-flow/${id}`;
    
            const header = {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            };
    
            const promise = axios.delete(`${API_URI}${API_ROUTE}`, header);
            promise.then( (response) => {
                renderRegisters();
            });
            promise.catch( (error) => {
                setIsLoading(false)
            });
        };
    };

    return (
        <RegisterContainer color={color} >
            <h3><span>{formatDate}</span>{description}</h3>
            <div>
                <span>{formatCurrency(value)}</span>
                <img src={close} alt='close button' id={id} onClick={handleClick} />
            </div>
        </RegisterContainer>
    );
};

const RegisterContainer = styled.div`

    display: flex;
    justify-content: space-between;

    margin-bottom: 12px;
    font-weight: 400;
    font-size: 16px;v

    h3 {
        color: #000000;
    };

    h3 > span {
        color: #C6C6C6;
    };

    span {
        margin-right: 10px;
        color: ${props => props.color}
    };

    div {
        display: flex;
    };

    img {
        width: 20px;
        height: 20px;
        cursor: pointer;
    };
`;