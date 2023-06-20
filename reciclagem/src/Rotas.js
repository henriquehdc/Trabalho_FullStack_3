import { RouterProvider, createBrowserRouter } from "react-router-dom";
import  Login  from "./telas/login";
import Home from './telas/home'
import  Usuario  from "./telas/usuario";
import  PontosUsuario  from "./telas/pontos";
import  PremiosUsuario  from "./telas/listaPremiosUsuario";
import  Premio from "./telas/premio";
import  ListaPremios from "./telas/listaPremios";
import  PremioUsuarioCadastrar from "./telas/PremioUsuarioCadastro";

export const Rotas = () => {

    const rotas = createBrowserRouter([
        {path: "/",element: <Login />},
        {path: "/home",element: <Home />},
        {path: "/usuario",element: <Usuario />},
        {path: "/usuario/pontos",element: <PontosUsuario />},
        {path: "/premio/usuario",element: <PremioUsuarioCadastrar />},
        {path: "/usuario/premios",element: <PremiosUsuario />},
        {path: "/premio",element: <Premio />},
        {path: "/premio/lista",element: <ListaPremios />},

    ]);

    return <RouterProvider router={rotas}/>
}
