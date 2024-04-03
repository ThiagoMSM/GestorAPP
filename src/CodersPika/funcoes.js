import { ref, push, set, get } from "firebase/database";
import { db } from "../DB/firebase";
import {empresaJaExistente, camposNaoPreenchidos, empresaCadastroValido} from "../mensagens/msg"; //importa as mensagens

//geral:
export const entrar = (email) => {
    alert(`Seu email aí, mano: ${email}`);
};

export const navegaTela = (navigation, telaAlvo) =>{
    navigation.navigate(telaAlvo);
};

//banco de dados:
export const CadastrarEmpresa = async (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {
    if (nomeEmpresa === "" || cnpj === "" || endereco === "" || tipoEmpresa === "") {
        alert(camposNaoPreenchidos());
        return;
    }

    const EMPRESASRef = ref(db, 'Empresas'); 
    const snapshot = await get(EMPRESASRef); //pega todos os registros do node Empresas
    
    if (cnpjUnico(snapshot,cnpj)) {
        alert(empresaJaExistente());
        return;
    }

    const empresaRef = push(EMPRESASRef); // manda pro bd
    try {
        await set(empresaRef, {
            nome_empresa: nomeEmpresa,
            cnpj_empresa: cnpj,
            endereco_empresa: endereco,
            tipo_Empresa: tipoEmpresa
        });
        alert(empresaCadastroValido());
        console.log("ID Unico:", empresaRef.key);
    } catch (excecao) {
        console.error("Error:", excecao);
    }
};

const cnpjUnico = (snapshot,cnpj) =>{
    let cnpjJaCadastrado = false; // Bool 
    snapshot.forEach((registro) => { //itera por cada registro do node Empresas

        let registroTraduzido = registro.val(); //"traduz" o registro
        if (registroTraduzido.cnpj_empresa === cnpj) 
        { 
            cnpjJaCadastrado = true;
            return; 
        }
    });
    return cnpjJaCadastrado;
}

/*TODO: mudar a forma de cadastro, não gravar nada no banco de dados por agora, só checar se o cnpj é unico. Se sim, deixa passar
para a próxima etapa (cadastro de gestor), caso contrário, exibe a msg de erro de cnpj não unico.

*/