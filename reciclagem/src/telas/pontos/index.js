import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import {  Typography} from 'antd';

export default function PontosUsuario (){

    const id = Cookies.get('userID')
    const [user , setUser] = useState();
    const { Title } = Typography;

const getUserPoints = async (id) => { 
    
    const url = 'http://localhost:4000/usuario/' + id;
    const param = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const result = await (await fetch(url, param)).json();
    setUser(result)
}

useEffect(() => {
    getUserPoints(id) 
},[id])

    return <h1>
                {user?.status === 200
                ? <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Title level={1} style={{ textAlign: 'left', marginTop: 20}}>
                        {"Pontuação Total: " + user.usuario.pontos }
                    </Title>
                </div>
                : <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Title level={1} style={{ textAlign: 'left', marginTop: 20}}>
                        {"Você ainda não possui pontos 😅" }
                    </Title>
                </div>
                }     
            </h1>
}