import React from 'react';

import { RouteComponentProps } from 'react-router-dom';
import storage from '../../utils/storage'

import schedule from 'node-schedule';

import IQOption from 'iqoptionzzz';
import operate from '../../utils/operate'

import axios from 'axios';

import { toast } from 'react-toastify';
import { Div, DivChange, DivConfig, DivStarted, StartBot } from './styled';

import { useSelector } from 'react-redux';


export default function LoginIQ({ history }:{ history: RouteComponentProps['history'] }) {
    const [ stopWin, setStopWin ] = React.useState(0);
    const [ stopLoss, setStopLoss ] = React.useState(0);
    const [ delay, setDelay ] = React.useState(0);
    const [ file, setFile ] = React.useState<File>();
    const [ balance, setBalance ] = React.useState<number | boolean>(false);
    const [ buttonName, setButtonName ] = React.useState('Configurar');
    const [ martinGales, setMartinGales ] = React.useState<number[]>([]);

    const [ oldTrade, setOldTrade ] = React.useState({
        time: '',
        active: '',
        direction: '',
    });

    const [ nextTrade, setNextTrade ] = React.useState({
        time: '',
        active: '',
        direction: '',
    });

    const buttonStart = React.useRef<HTMLButtonElement>();

    const div = React.useRef<HTMLDivElement>();
    const divConfig = React.useRef<HTMLDivElement>();
    const divChange = React.useRef<HTMLDivElement>();
    const divStarted = React.useRef<HTMLDivElement>();

    const martin = React.useRef<HTMLInputElement>();

    const iqoption = useSelector((state: {
        iqoption: {
            email: string;
            password: string;
            ssid: string;
        }
    }) => state.iqoption);
    
    async function handleClick(e: React.ChangeEvent<any>): Promise<unknown> {
        if(buttonStart.current.innerText === 'Stop') {
            divStarted.current.style.display = 'none';
            buttonStart.current.innerText = 'Start';
            buttonStart.current.style.backgroundColor = 'green';
            div.current.style.display = 'block';
            divChange.current.style.display = 'block';


            return;
        }
        
        const errors: string[] = [];
        if(!stopWin) errors.push('Preencha stopWin');
        if(!stopLoss) errors.push('Preencha stopLoss');
        if(!file) errors.push('Coloque uma lista');
        if(martinGales.length === 0) errors.push('Preencha os martingales');

        if(errors.length > 0) return errors.forEach((value) => {
            toast.error(value);
        });

        if(buttonStart.current.innerText === 'Start') {
            buttonStart.current.innerText = 'Stop';
            buttonStart.current.style.backgroundColor = 'red';
            div.current.style.display = 'none';
            divConfig.current.style.display = 'none';
            divChange.current.style.display = 'none';
            divStarted.current.style.display = 'block';
        } 


        storage.setStopLoss(stopLoss);
        storage.setStopWin(stopWin);
        storage.setMartinGales(martinGales);

        const formData = new FormData();
        formData.append('file', file);

       try {
           const { data }: { data: any } = await axios.post(`http://${process.env.REACT_APP_PUBLIC_URL}/sinais`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        });

        if(data.length === 0) return toast.error('Por favor adicione pelo menos 2 trades a lista');

        try {
            const API = await toast.promise(IQOption({
                email: iqoption.email,
                password: iqoption.password
            }), {
                pending: 'Aguarde',
                success: 'Bot inicializado, nao feche o navegador',
                error: 'Erro ao iniciar o bot'
            });
            console.log('IQOPTION CONNECTED');

            setOldTrade({
                active: data[0].active,
                direction: data[0].direction,
                time: `${data[0].time.hour}:${data[0].time.minutes}`
            });

            data.forEach((value, index, array) => {
                schedule.scheduleJob({ hour: value.time.hour, minute: value.time.minutes}, () => {
                    try {
                        let indexOld = index - 1;
                if(index === 0) indexOld = 0;

                let indexNew = index + 1;
                if(array.length - 1 === index) indexNew = index;

                setOldTrade({
                    active: array[indexOld].active,
                    direction: array[indexOld].direction,
                    time: `${array[indexOld].time.hour}:${array[indexOld].time.minutes}`
                });

                setNextTrade({
                    active: array[indexNew].active,
                    direction: array[indexNew].direction,
                    time: `${array[indexNew].time.hour}:${array[indexNew].time.minutes}`
                });
                
                    operate(API, value.active, value.direction, Number(value.duration));
                    } catch(e) {
                        //
                    }
                });
            });
            
        } catch(e) {
            console.log(e);
            toast.error('Verifique as configuracoes');
            div.current.style.display = 'block';
            divStarted.current.style.display = 'none';
            buttonStart.current.innerText = 'Start';
            buttonStart.current.style.backgroundColor = 'green';
        }
       } catch(e) {
           toast.error('Arquivo invalido');
       }

       

    }

    React.useEffect(() => {
         async function getBalance() {
             if(balance) return;
            const ws = new WebSocket('wss://iqoption.com/echo/websocket');

           ws.onopen = () => {
               console.log('Started');
               ws.send(JSON.stringify({"name":"ssid","msg": iqoption.ssid}));
            }

            ws.onmessage = (message) => {
                const myMessage = JSON.parse(message.data) as {
                    name: string;
                    msg: {
                        balances: {
                            amount: number;
                        }[];
                    }
                };
                
                if(myMessage.name === 'profile') {
                    setBalance(myMessage.msg.balances[1].amount)
                    ws.close();
                }
            }
        }

        getBalance();
    });
    return(
        <>
        <DivStarted ref={divStarted}>
            <p>Anterior</p>
            <button><p>{ oldTrade.time } { oldTrade.active } { oldTrade.direction }</p></button>

            <p>Proximo</p>
            <button><p>{ nextTrade.time } { nextTrade.active } { nextTrade.direction }</p></button>
        </DivStarted>
        <DivChange ref={divChange}>
            <button onClick={(e: any) => {
                if(div.current.style.display === 'none') {
                    div.current.style.display = 'block';
                    divConfig.current.style.display = 'none';
                    setButtonName('Configurar');
                    return;
                }
                
                div.current.style.display = 'none';
                divConfig.current.style.display = 'block';
                
                setButtonName('Iniciar');
            }}>{ buttonName }</button>
        </DivChange>
        <DivConfig ref={divConfig}>
            <h1>Banca <span>{ balance ? `$${balance}` : 'Loading...' }</span></h1>
            <h1>Delay <span><input type="number" onChange={(e) => {
                const value = e.target.value as unknown as number;
                if(!value) return;
                setDelay(value);
            }}/></span></h1>
            <h1>Stop Win <span><input type="number" onChange={(e) => {
                const value = e.target.value as unknown as number;
                if(!value) return;
                setStopWin(value);
            }}/></span></h1>
            <h1>Stop Loss <span><input type="number" onChange={(e) => {
                const value = e.target.value as unknown as number;
                if(!value) return;
                setStopLoss(value);
            }}/></span></h1>
            <h1>MartinGale <span><input ref={martin} type="number" /> <button onClick={() => {
                const value = martin.current.value as unknown as number;
                if(isNaN(value)) return;
                const splited = (value as unknown as string).split(' ');
                if(splited[0] === '') return;
                setMartinGales((state) => {
                    const newState = [ ...state ];
                    newState.push(Number(value));
                    martin.current.value = '';
                    return newState;
                });
            }}>Add</button></span></h1>
            <h1>Listas <span><input type="file" accept="text/plain" onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
            }} /></span></h1>
        </DivConfig>

        <Div ref={div}>
            <h1>Banca <span>{ balance ? `$${balance}` : 'Loading...' }</span></h1>
            <h1>Delay <span>{ delay }</span></h1>
            <h1>Stop Win <span>{ stopWin }</span></h1>
            <h1>Stop Loss <span>{ stopLoss }</span></h1>
            <h1>MartinGales <span>{ martinGales.map((value) => {
                return `${value}\n`;
            }) }</span></h1>
        </Div>

        <StartBot>
            <button ref={buttonStart} onClick={handleClick}>Start</button>
        </StartBot>
        </>
    );
}
