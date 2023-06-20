import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import {  Typography} from 'antd';

export default function Home (){
    const id = Cookies.get('userID')
    const [user , setUser] = useState();
    const { Title } = Typography;

const getUser = async (id) => { 
    
    const url = 'http://localhost:4000/usuario/' + id;
    const param = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const result = await (await fetch(url, param)).json();
    setUser(result)
}

useEffect(() => {
    getUser(id) 
},[id])

    return <h1>
                {user?.status === 200
                ? <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Title level={1} style={{ textAlign: 'left', marginTop: 20}}>
                    {"Bem vindo " + user.usuario.nome }
                    </Title>
                </div>
                : null
                }     
            </h1>
}