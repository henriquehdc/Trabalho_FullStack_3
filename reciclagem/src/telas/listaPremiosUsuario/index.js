import { useState, useEffect } from "react";
import {  Collapse, Typography,Card } from 'antd';
import Cookies from "js-cookie"

export default function PremiosUsuario (){

const id = Cookies.get('userID')
const [user , setUser] = useState();
const { Title } = Typography;
const [premios , setPremios] = useState(null);

const getUserPrize = async (id) => { 
    
    const url = "http://localhost:4000/premio";
    const param = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const result = await (await fetch(url, param)).json();
    var meusPremios=[];

    result.premios.forEach(result => {
        if(result.usuario != null){
            if(result.usuario[0] === id){
                meusPremios.push(result)
            }
        }     
    });
    setPremios(meusPremios)
    
}

useEffect(() => {
    getUserPrize(id) 
},[id])

    return  <div>
                {premios != null && premios.length >0
                ?<div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
                    <div >
                    <Title level={1} style={{ textAlign: 'left', marginTop: 20}}>
                        Meus Prêmios
                    </Title>
                    </div>
                    <div> 
                    {premios.map((result =>
                        <div >
                            <Card style={{ borderRadius: '8px', border: 'none', backgroundColor: 'lightblue', marginBottom:20}} >  
                                <h2 style={{ textAlign: 'left'}}>
                                    {result.descricao +", pontos: " + result.pontos}
                                </h2>
                            </Card>
                        </div>))}
                    </div>
                </div>    
                : <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Title level={1} style={{ textAlign: 'left', marginTop: 20}}>
                        {"Você ainda não possui prêmios 😅" }
                    </Title>
                </div>
                }     
            </div>
}   