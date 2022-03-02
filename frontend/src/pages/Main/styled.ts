import styled from 'styled-components';

export const Banner = styled.div`
    img {
        display: block;
        margin: 0 auto;
        -webkit-user-drag: none;
    }
`;

export const DivChange = styled.div`
    position: absolute;
    right: 0;

    button {
        cursor: pointer;
        padding: 10px 50px;
    }
`;

export const Div = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #fff;
    padding: 20px;

    h1 + h1 {
        padding: 20px 0 0;
    }

    h1 {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 20px;
        gap: 200px;

        span {
            font-weight: 600;
            overflow: auto;
            height: 30px;

            input {
                color: black;
                font-weight: 600;
                width: 70px;
                padding: 0px 0 0 20px;
            }
        }
    }
`;

export const DivConfig = styled.div`
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #fff;
    padding: 20px;

    h1 + h1 {
        padding: 20px 0 0;
    }

    h1 {
        display: flex;
        justify-content: space-between;
        color: #fff;
        font-size: 20px;
        gap: 200px;
        span {
            font-weight: 600;

            input {
                color: black;
                font-weight: 600;
                width: 70px;
                height: 24px;
                padding: 0px 0 0 20px;
                display: block
            }

            input[type=file] {
                display: inline-block;
                cursor: pointer;
                border: none;
                width: 90px;
            }
            
            button {
                cursor: pointer;
                width: 100%;
            }
        }
    }
`;

export const DivStarted = styled.div`
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #fff;
    padding: 20px;


    p {
        color: #fff;
        font-size: 20px;
        margin: 20px 0 0;
    }

    button {
        display: flex;
        text-align: center;
        color: black;
        font-weight: 600;
        width: 300px;
        display: flex;
        justify-content: center;
        p {
            text-align: center;
            color: black;
            padding: 0 0 15px;
        }
        }
`;

export const StartBot = styled.div`
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -90%);

    button {
        background-color: green;
        color: #fff;
        font-weight: 600;
        font-size: 18px;
        cursor: pointer;
        padding: 20px 150px;
    }
`;