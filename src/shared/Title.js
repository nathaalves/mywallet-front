import styled from "styled-components";
import exit from '../assets/images/exit.svg'

export default function Title ({ children, withButton }) {

    return (
        <Container>
            <h2>
                {children}
            </h2>
            {withButton ? <img src={exit} alt='exit button' /> : null}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;

    h2 {
        margin: 25px 0;

        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    }
`;