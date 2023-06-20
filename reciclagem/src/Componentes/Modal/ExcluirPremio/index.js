import React, { useState } from 'react';

const ExcluirPremio = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleAction = async () => {
/*     const url = "http://localhost:4000/premio/" + selectedItemId;
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
    } */
    console.log('ID do objeto selecionado:', selectedItemId);
  };

  const handleItemClick = (id) => {
    setSelectedItemId(id);
    handleAction();
  };

  return (
    <div>
      <button onClick={() => handleItemClick(1)}>Item 1</button>
      <button onClick={() => handleItemClick(2)}>Item 2</button>
      <button onClick={() => handleItemClick(3)}>Item 3</button>
    </div>
  );
};

export default ExcluirPremio;
