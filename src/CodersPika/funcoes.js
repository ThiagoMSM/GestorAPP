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
export const dadosEmpresaCongruentes = async (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {
    let irregular = false;

    if (nomeEmpresa === "" || cnpj === "" || endereco === "" || tipoEmpresa === "") {
        alert(camposNaoPreenchidos());
        irregular = true;
    }
    const empresasReferencia = ref(db, 'Empresas'); 
    const snapshot = await get(empresasReferencia); //pega todos os registros do node Empresas em um vetor        

    if (ValorNaoUnico("cnpj_empresa",snapshot,cnpj)){
        alert(empresaJaExistente());
        irregular = true;
    }
    return irregular;
}


export const CadastrarEmpresa = async (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {
    

    if (ValorNaoUnico("cnpj_empresa",snapshot,cnpj)) {
        alert(empresaJaExistente());
        return;
    }
    const novoNodeEmpresa = push(empresasReferencia); // gera um child node de codigo unico no node empresa (push)
    
    try {
        await set(novoNodeEmpresa, {
            nome_empresa: nomeEmpresa,
            cnpj_empresa: cnpj,
            endereco_empresa: endereco,
            tipo_Empresa: tipoEmpresa
        });

        alert(empresaCadastroValido());

        console.log("ID Unico:", novoNodeEmpresa.key);

    } catch (excecao) {
        console.error("Error:", excecao);
    }
};

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

/*TODO: mudar a forma de cadastro, não gravar nada no banco de dados por agora, só checar se o cnpj é unico. Se sim, deixa passar
para a próxima etapa (cadastro de gestor), caso contrário, exibe a msg de erro de cnpj não unico.
*/