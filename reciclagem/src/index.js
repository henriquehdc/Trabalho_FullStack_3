import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Rotas} from "./Rotas"
import Header from './Componentes/Header';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <Header/>
    <Rotas />   
  </div>
);

reportWebVitals();
