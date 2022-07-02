import styled from "styled-components";
import exit from '../assets/images/exit.svg';
import back from '../assets/images/back.svg';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import axios from 'axios';

export default function Title ({ children, action }) {

    const navigate = useNavigate();
    const { session, setSession } = useContext(UserContext);
    
    let src = null;
    let alt = null;
    
    if (action === "exit") {
        src = exit;
        alt = 'exit button';
    };

    if (action === 'back') {
        src = back;
        alt = 'return button';
    };

    function handleClick () {
        
        if (action === "exit") {
            
            const API_URI = 'https://my-wallet-server-project.herokuapp.com';
            const API_ROUTE = "/session";

            const header = {
                headers: {
                    Authorization: `Bearer ${session.token}`
                }
            };

            const promise = axios.delete(`${API_URI}${API_ROUTE}`, header)
            promise.then( () => {
                navigate('/');
                localStorage.removeItem('MyWalletSession');
                setSession(null);
            });
        };
        if (action === "back") navigate('/');
    };

    return (
        <Container>
            <h2>
                {children}
            </h2>
            {action ? <img src={src} alt={alt} onClick={handleClick}/> : null}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    h2 {
        margin: 25px 0;

        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    };
`;