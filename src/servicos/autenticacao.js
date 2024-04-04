import { ref, push, set, get } from "firebase/database";
import { db } from "../DB/firebase";
import {empresaJaExistente, camposNaoPreenchidos, GestorJaExistente, LoginGestorEempresaFeito} from "../mensagens/msg"; //importa as mensagens

let chaveEmpresa = 'ValorPadrao';

export const dadosCongruentes = async (dados,node,campo,valorNovo) => { 
    for(let i=0; i<dados.length;i++){
        if (dados[i] === "") { // verifica se todos os dados estão completos
            alert(camposNaoPreenchidos());
            return false; // se tiver, ja retorna false e nem executa o resto
        }
    }

    const referenciaGenerica = ref(db, node);  // pega a referencia no node especificado, como login, Empresas, Produtos, etc...
    const snapshot = await get(referenciaGenerica);     // pega todos os registros

    if (ValorNaoUnico(campo,snapshot,valorNovo)){ 
        alert(empresaJaExistente());
        return false;
    }
    return true; //true quando tem nada de errado
}

const ValorNaoUnico = (campo, snapshot, valor) => {
    let jaExiste = false;
    try{                                                    //Resumindo, o javascript nao permite a saída prematura do foreach, mesmo com um return, ele continua iterando até acabar
                                                            //obviamente isso eh ruim pra kct, pq se vc tiver 1000 registros, e ele achou um duplicado no 2, ele vai ler mais 998 registros mesmo assim...
                                                            //e a snapshot firebase não é um array, entao nenhum outro método lê essa porra. Entao, tive q forçar uma exceção, pq assim, ele sai do foreach
        snapshot.forEach((childSnapshot) => {
            const registroTraduzido = childSnapshot.val();
            if (registroTraduzido[campo] === valor) {
                jaExiste = true;
                throw 'Empresa não única'               //força a saída prematura do foreach
            }
        });
    }catch(excecao){
        console.log("erro: " + excecao)                 //errinho pa nois ver
    }finally{
        return jaExiste;                                //se achou nada, retorna false, se achou duplicado, retorna true...
    } 
};

export const obtemKeyEmpresa = async(infoEmpresa,cnpj) =>{
    if(await dadosCongruentes(infoEmpresa, 'Empresas', 'cnpj_empresa',cnpj))
    {
        const empresasReferencia = ref(db, 'Empresas'); 
        chaveEmpresa = await push(empresasReferencia); //chave node pra empresa ***NAO SEI SE TA CERTO FAZER ASSIM!!!!!!!!!!!!!!!!!!!!!***
        return true;
    }
    return false;
}

//////////////CADASTRAR GESTOR//////////////
////////////////////////////////////////////////////////////////
export const CadastrarGestor = async (EmailGestor,CPF,Senha, NomeGestor) => {
    if(!await dadosCongruentes([EmailGestor,CPF,Senha,NomeGestor],'Logins','Email',EmailGestor))
        return false;

    const LoginsRef = ref(db, 'Logins'); 
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
    if (!await dadosCongruentes([nomeEmpresa, cnpj, endereco, tipoEmpresa],'Empresas','cnpj_empresa',cnpj))
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