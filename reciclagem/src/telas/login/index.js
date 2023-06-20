import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, message,Typography} from 'antd';
import { UserOutlined , LockOutlined } from '@ant-design/icons';
import  Cookies  from "js-cookie"

export default function LoginPage () {
    
    const { Title } = Typography;
    const navigate = useNavigate();

    const login = async (username , senha) => {

        const body = { username: username , senha: senha}
        const url = "http://localhost:4000/usuario/login";
        const param = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        const resposta = await fetch(url, param); 
        const respostaJson = await resposta.json();

        console.log(resposta.status)
        if (respostaJson.status !== 200){
            message.error("Erro ao realizar login!");
        }else if (respostaJson.status === 200){
            message.success('Usuário logado com sucesso!');
            Cookies.remove("userID");
            Cookies.set('userID', (respostaJson.usuario.user._id))
            navigate("/home");
        }
    };

    return <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'flex-start', alignItems: 'center'}}>
                <div >
                    <Title level={1} style={{ textAlign: 'left', marginTop: 20, marginBottom: 40}}>
                        Login
                    </Title>
                </div> 
                <Form name="login"  onFinish={(dados) => login(dados.username, dados.senha)} 
                                    onFinishFailed={(erros) => console.log(erros)}
                                    style={{ width: 500 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Form.Item  name="username"
                        rules={[ { required: true, message: 'Informe seu nome de usuário' } ]}>
                            <Input
                                    prefix={<UserOutlined type="user" style={{ color: 'rgba(0,0,0,.25)'}} />}
                                    placeholder="usuario"
                                    name='username'
                                    style={{ marginBottom: 10, width:300 }} />
                        </Form.Item>
                        <Form.Item  name="senha"
                        rules={[ { required: true} ]}>
                            <Input 
                                    prefix={<LockOutlined type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Senha"
                                    name="senha" 
                                    style={{ marginBottom: 10, width: 300}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"> Login </Button>
                        </Form.Item>
                    </div>
                </Form>   
                <p style={{ marginTop: -10}}>Não tem um usuário?</p>
                <Button style={{ marginTop: -10}} href="/usuario"> Cadastre-se!</Button>
            </div>      
}