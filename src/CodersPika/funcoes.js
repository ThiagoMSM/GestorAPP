import {ref, set,push } from "firebase/database";
import { db } from "../DB/firebase";

//geral:
export const entrar = (email) => {
    alert(`seu email ai mermao: ${email}`);
};

export const navegaTela = (navigation,telaAlvo) =>{
    navigation.navigate(telaAlvo);
};

//banco de dados:
export const CadastrarEmpresa = (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {
    if (nomeEmpresa === "" || cnpj === "" || endereco === "" || tipoEmpresa === "") {
        alert("Preencha todos os campos antes de continuar");
        return;
    }
    const empresasRef = ref(db, 'Empresas');
    const empresaRef = push(empresasRef); // Create a new reference for the empresa

    set(empresaRef, {
        nome_empresa: nomeEmpresa,
        cnpj_empresa: cnpj,
        endereco_empresa: endereco,
        tipo_Empresa: tipoEmpresa
    }).then(() => {
        alert("Empresa cadastrada com sucesso");
        // Use the key property of the reference to get the unique ID
        console.log("New empresa ID:", empresaRef.key);
    }).catch((error) => {
        console.error("Erro: ", error);
    });
};


