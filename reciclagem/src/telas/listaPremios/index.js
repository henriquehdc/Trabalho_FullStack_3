import { useState, useEffect } from "react";
import {  Collapse, Typography, message, Button, Modal,Form, Input} from 'antd';


export default function ListaPremios (){

const [form] = Form.useForm();
const { Panel } = Collapse;
const { Title } = Typography;
const [premios , setPremios] = useState(null);
const [pontosSelecionado , setPontosSelecionado] = useState(null);
const [quantidadeSelecionado , setQuantidadeSelecionado] = useState(null);
const [descricaoSelecionado , setDescricaoSelecionado] = useState(null);
const [idSelecionado , setIdSelecionado] = useState(null);
const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
const [isEditModalVisible, setIsEditModalVisible] = useState(false);

const EditablePanelHeader = ({ descricao, id, pontos, quantidade, onEdit, onDelete }) => {
    const handleEdit = () => {
        handleSelectPanel(id, pontos, quantidade, descricao); 
        onEdit();
    };

    const handleDelete = () => {
        handleSelectPanel(id); 
        onDelete();
    };
    return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> 
        <span >{descricao}</span>
        <div>
            <Button type="primary" onClick={handleEdit} style={{ marginLeft: 10}} >Editar</Button>
            <Button danger type="primary" onClick={handleDelete} style={{ marginLeft: 10}}>Excluir</Button>
        </div>
    </div>   
    );
};

const handleOkDelete = async () => {
    const url = "http://localhost:4000/premio/" + idSelecionado;
    const param = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    }

    const resposta = await fetch(url, param); 
    const respostaJson = await resposta.json();

    console.log(respostaJson)
    if (respostaJson.status !== 200){
        message.error('Ocorreu um erro ao excluir o prêmio');
    }else if (respostaJson.status === 200){
        message.success('Prêmio excluido');
    }

    await getPremios();
    setIsDeleteModalVisible(false);

}

const handleOkEdit = async (descricao,pontos, quantidade ) => {
   
    const body = { descricao: descricao , quantidade: quantidade, pontos: pontos}
    const url = "http://localhost:4000/premio/" + idSelecionado;
    const param = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }

    const resposta = await fetch(url, param); 
    const respostaJson = await resposta.json();

    console.log(respostaJson)
    if (respostaJson.status !== 200){
        message.error('Ocorreu um erro ao editar o prêmio');
    }else if (respostaJson.status === 200){
        message.success('Prêmio editado com sucesso!');
    }
    
    await getPremios();
    setIsEditModalVisible(false);
}

const handleEdit = () => {
    setIsEditModalVisible(true);
};

const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
};

const handleDelete = () => {
    setIsDeleteModalVisible(true);
};

const handleSelectPanel = (id, pontos, quantidade, descricao) =>{
    setIdSelecionado(id)
    setPontosSelecionado(pontos)
    setQuantidadeSelecionado(quantidade)
    setDescricaoSelecionado(descricao)
    console.log(id)
}
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
    getPremios() 
},[])

    return  premios === null 
            ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Title level={1} style={{ textAlign: 'top', marginBottom: 120 }}>
                    Nenhum Prêmio cadastrado!
                </Title>
            </div>
            :<div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
                <div >
                    <Title level={1} style={{ textAlign: 'left', marginTop: 20}}>
                        Lista de prêmios
                    </Title>
                </div>
                <div >
                    {premios.premios.map((result =>
                    <div>
                        <Collapse style={{ marginTop: 20, marginLeft:30}}>
                        <Panel header={<EditablePanelHeader descricao={result.descricao} id ={result._id} pontos={result.pontos} quantidade={result.quantidade} onEdit={handleEdit} onDelete={handleDelete}/>} style={{ width: '400px' }}>
                                <p>Quantidade: {result.quantidade}</p>
                                <p>Pontos: {result.pontos}</p>
                            </Panel>          
                        </Collapse>    
                    </div>                
                    ))}
                <Modal
                    title="Confirmação de exclusão"
                    onOk={handleOkDelete}
                    open={isDeleteModalVisible}
                    onCancel={handleCancel}>
                        <p>Deseja realmente excluir este item?</p>
                </Modal>           
                <Modal
                    title="Confirmação de edição"              
                    open={isEditModalVisible}
                    footer={null} 
                    onCancel={handleCancel}>
                        <div>
                            <Form name="login"  onFinish={(dados) => handleOkEdit(dados.descricao, dados.quantidade, dados.pontos)}
                                                style={{ width: 500 }} form={form}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Form.Item  name="descricao" label={"Descrição"}>
                                        <Input
                                                defaultValue={descricaoSelecionado}
                                                name='descricao'
                                                style={{ marginBottom: 10, width:300 }} />
                                    </Form.Item>
                                    <Form.Item  name="quantidade" label={"Quantidade"} >
                                        <Input        
                                                type='number'                             
                                                defaultValue={quantidadeSelecionado}
                                                name="quantidade" 
                                                style={{ marginBottom: 10, width: 310}}/>
                                    </Form.Item>
                                    <Form.Item  name="pontos" label={"Pontos"}>
                                        <Input 
                                                type='number' 
                                                defaultValue={pontosSelecionado}
                                                name="pontos" 
                                                style={{ marginBottom: 10, width: 280}}/>                                             
                                    </Form.Item>
                                        
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit"> Atualizar </Button>
                                    </Form.Item>
                                </div>
                            </Form> 
                        </div>
                </Modal>           
                </div>
            </div> 
            
}   