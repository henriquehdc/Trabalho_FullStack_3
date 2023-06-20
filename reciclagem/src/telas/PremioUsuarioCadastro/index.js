import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import {  Collapse, Typography,Button, Modal, message} from 'antd';

export default function PremioUsuarioCadastrar (){

const id = Cookies.get('userID')
const { Panel } = Collapse;
const { Title } = Typography;
const [premios , setPremios] = useState(null);
const [idSelecionado , setIdSelecionado] = useState(null);
const [isAddModalVisible, setIsAddModalVisible] = useState(false);

const EditablePanelHeader = ({ descricao, id, onAdd }) => {
    const handleAdd =() =>{
        setIdSelecionado(id)
        onAdd()
    }
    return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
        <span >{descricao}</span>
        <div>
            <Button type="primary" onClick={handleAdd} style={{ marginLeft: 10}}>Atribuir</Button>           
        </div>
    </div>   
    );
};

const handleOkAdd = async () =>{
    const url = "http://localhost:4000/premio/" + idSelecionado +"/usuario/" + id;
    const param = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    }

    const resposta = await fetch(url, param); 
        const respostaJson = await resposta.json();
        if (respostaJson.status !== 200){
            message.error('Parece que esse usuário ja possui esse Prêmio!');
        }else if (respostaJson.status === 200){
            message.success('Prêmio atribuido com sucesso!');
        }

    setIsAddModalVisible(false);    
    getPremios();
}

const handleAdd = () => {
    setIsAddModalVisible(true);
};

const handleCancel = () => {
    setIsAddModalVisible(false);
};

const getPremios = async () => { 
    const url = "http://localhost:4000/premio";
    const param = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const result = await (await fetch(url, param)).json();
    setPremios( result)
}
    
    useEffect(() => {
        getPremios(); 
},[])

return premios === null 
    ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Title level={1} style={{ textAlign: 'top', marginBottom: 120 }}>
            Nenhum Prêmio cadastrado!
        </Title>
    </div>
    :<div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
        <div >
            <Title level={1} style={{ textAlign: 'left', marginTop: 20}}>
                Lista de prêmios para atribuição
            </Title>
        </div>
        <div >
            
            {premios.premios.map((result =>
            result.quantidade >=1 
            ?<div>
                <Collapse style={{ marginTop: 20, marginLeft:30}}>
                <Panel header={<EditablePanelHeader descricao={result.descricao} id ={result._id} onAdd={handleAdd}  />} style={{ width: '400px' }}>
                        <p>Pontos: {result.pontos}</p>
                        <p>Quantidade: {result.quantidade}</p>
                    </Panel>          
                </Collapse>    
            </div>
            :null))}
            <Modal
                title="Confirmação atribuição"
                onOk={handleOkAdd}
                open={isAddModalVisible}
                onCancel={handleCancel}>
                    <p>Deseja realmente atribuir este premio a este usuário?</p>
            </Modal>
       </div>
    </div>             
}