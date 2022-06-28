import styled from "styled-components";

const Page = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props => props.centeredContent ? 'center' : 'unset'};


    width: 100vw;
    height: 100vh;
    padding: 0 25px;

    background-color: #8C11BE;

`;

export default Page;