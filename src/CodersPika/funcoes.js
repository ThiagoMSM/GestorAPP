import { ref, push, set, get } from "firebase/database";
import { db } from "../DB/firebase";
import {empresaJaExistente, camposNaoPreenchidos, empresaCadastroValido, GestorJaExistente, LoginGestorEempresaFeito} from "../mensagens/msg"; //importa as mensagens

//geral:
export const entrar = (email) => {
    alert(`Seu email aí, mano: ${email}`);
};

export const navegaTela = (navigation, telaAlvo, params) =>{
    navigation.navigate(telaAlvo, params);
};

//banco de dados:

let chaveEmpresa = 'ValorPadrao';

export const dadosCongruentesEmpresa = async (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {

    if (nomeEmpresa === "" || cnpj === "" || endereco === "" || tipoEmpresa === "") { //verifica se tem algo nao preenchido
        alert(camposNaoPreenchidos());
        return false;
    }

    const empresasReferencia = ref(db, 'Empresas'); 
    const snapshot = await get(empresasReferencia); //pega todos os registros do node Empresas em um vetor        

    if (ValorNaoUnico("cnpj_empresa",snapshot,cnpj)){ //verifica se o cnpj já existe no banco
        alert(empresaJaExistente());
        return false;
    }
    return true; //true quando tem nada de errado
}

const ValorNaoUnico = (campo, snapshot,valor) =>{
    let jaExiste = false;
    snapshot.forEach((registro) => { //itera por cada registro do node Empresas
        let registroTraduzido = registro.val(); //"traduz" o registro
        if (registroTraduzido[campo] === valor) 
        {
            jaExiste = true;
            return; 
        }
    });
    return jaExiste;
}

export const obtemKeyEmpresa = () =>{
    const empresasReferencia = ref(db, 'Empresas'); 
    chaveEmpresa = push(empresasReferencia); //chave node pra empresa ***NAO SEI SE TA CERTO FAZER ASSIM!!!!!!!!!!!!!!!!!!!!!***
}

//////////////CADASTRAR GESTOR//////////////
////////////////////////////////////////////////////////////////
export const CadastrarGestor = async (EmailGestor,CPF,Senha, NomeGestor) => {
    if (EmailGestor === "" || CPF === "" || Senha === "" || NomeGestor === "") {
        alert(camposNaoPreenchidos());
        return false;
    }
    const LoginsRef = ref(db, 'Logins'); 
    const ForEachLine = await get(LoginsRef); //pega todos os registros do node Empresas
    
    if (ValorNaoUnico('Email', ForEachLine, EmailGestor)) {
        alert(GestorJaExistente());
        return false;
    }
    const novoNodeLogin = push(LoginsRef);
    try {
        await set(novoNodeLogin, {
            Nome: NomeGestor,
            Email: EmailGestor,
            CPF: CPF,
            Nivel_acesso: 2,
            Senha: Senha,
            empresa_id: chaveEmpresa.key
        });

    } catch (excecao) {
        console.error("Error:", excecao);
    }
    return true;
};
export const CadastrarEmpresa = async (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {
    if (!await dadosCongruentesEmpresa(nomeEmpresa, cnpj, endereco, tipoEmpresa))
        return;

    try {
        await set(chaveEmpresa, {
            nome_empresa: nomeEmpresa,
            cnpj_empresa: cnpj,
            endereco_empresa: endereco,
            tipo_Empresa: tipoEmpresa
        });

        alert(LoginGestorEempresaFeito());
    } catch (excecao) {
        console.error("Error:", excecao);
    }
};
