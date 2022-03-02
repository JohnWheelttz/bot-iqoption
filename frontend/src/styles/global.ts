import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        font-family: sans-serif;
        font-weight: 400;
        text-decoration: none;
        outline: none;
        padding: 0;
        margin: 0;
        border: none;
        box-sizing: border-box;    
    }

    body {
        background-color: #292323;
    }
`;