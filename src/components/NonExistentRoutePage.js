import styled from "styled-components"

export default function NonExistentRoutePage() {

    return (
        <Container>
            <img src='https://http.cat/404' alt="Rota não encontrada" />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;
    background-color: #8C11BE;

    img {
        width: 80%;
        height: calc(100vw * 0.65)
    }
`;