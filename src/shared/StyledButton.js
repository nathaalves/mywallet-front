import styled from "styled-components";
import add from '../assets/images/add.svg';
import remove from '../assets/images/remove.svg';

export default function StyledButton ({ action }) {

    let src = null;
    let text = null;
    if (action === 'add') {
        src = add;
        text = 'Nova entrada';
    };
    if (action === 'remove') {
        src = remove;
        text = 'Nova saída';
    };

    return (
        <Container>
            <img src={src} alt={`${action} button`} />
            <h3>{text}</h3>
        </Container>
    )
}


const Container = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 115px;
    padding: 10px;
    margin-bottom: 16px;

    background: #A328D6;
    border-radius: 5px;

    cursor: pointer;

    img {
        width: 22px;
        height: 22px;
    }

    h3 {
        width: 70px;
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
    }
`;
