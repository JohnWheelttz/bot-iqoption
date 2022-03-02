import styled from 'styled-components';

export const Banner = styled.div`
    img {
        display: block;
        margin: 0 auto;
        -webkit-user-drag: none;
    }
`;

export const Div = styled.div`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form {
        p {
            padding: 10px 0;
            color: #fff;
        }

        input {
            text-align: center;
            padding: 10px 50px;
            display: block;
        }

        button {
            background-color: #ff7700;
            display: block;
            margin: 20px auto 0 auto;
            padding: 10px 50px;
            color: #fff;
            font-weight: 600;
            cursor: pointer;

            &:disabled {
                cursor: not-allowed;
            }
        }
    }
`;