import React from 'react';

import axios from 'axios';

import { RouteComponentProps } from 'react-router-dom';

import logoIq from '../../assets/img/logo_iq.png';

import { toast } from 'react-toastify';
import { Div, Banner } from './styled';

import { useDispatch } from 'react-redux';
import * as actions from '../../store/modules/iqoption/action';

export default function LoginIQ({ history }:{ history: RouteComponentProps['history'] }) {
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');

    const button = React.useRef<HTMLButtonElement>();
    
    const dispatch = useDispatch();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        button.current.disabled = true;

        if(!email || !password) {
            toast.error('Campos vazios');
            button.current.disabled = false;
            return;
        }
        try {
            const { data: { ssid } }: { data: { ssid: string; } } = await toast.promise(axios.post(`http://${process.env.REACT_APP_PUBLIC_URL}/api/v2/login`, {
                identifier: email,
                password
            }), {
                success: 'Logado com sucesso',
                error: 'Falha no login',
                pending: 'Carregando'
            });

            dispatch(actions.loginIqoption({
                email: email,
                password,
                ssid: ssid
            }));
           history.push('/main');
        } catch(e) {
            dispatch(actions.logoutIqoption());
            button.current.disabled = false;
        }
    }
    
    return(
        <>
        <Banner>
            <img src={logoIq} alt="Logo" />
        </Banner>

        <Div>
            <form onSubmit={handleSubmit}>
                <p>Email:</p>
                <input type="email" onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
                <p>Senha:</p>
                <input type="password" onChange={(e) => {
                    setPassword(e.target.value);
                }} />

                <button ref={button} type="submit">Entrar</button>
            </form>
        </Div>
        </>
    );
}
