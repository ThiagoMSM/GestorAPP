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


export const CadastrarEmpresa = async (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {
    

    if (ValorNaoUnico("cnpj_empresa",snapshot,cnpj)) {
        alert(empresaJaExistente());
        return;
    }

    const empresasReferencia = ref(db, 'Empresas'); 

    const novoNodeEmpresa = push(empresasReferencia); // gera um child node de codigo unico no node empresa (push)
    
    try {
        await set(novoNodeEmpresa, { // empresasReferencia, id>>>>>>>>>>novoNodeEmpresa[0] = empresasReferencia, novoNodeEmpresa[1] = "5ifdsidf99i3w9i"
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




//////////////CADASTRAR GESTOR//////////////
////////////////////////////////////////////////////////////////
export const CadastrarGestor = async (EmailGestor,CPF,Senha) => {
    if (EmailGestor === "" || CPF === "" || Senha === "") {
        alert(camposNaoPreenchidos());
        return;
    }

    
    const EMPRESASRef = ref(db, 'Empresas'); 
    const snapshot = await get(EMPRESASRef); //pega todos os registros do node Empresas
    
    if (cnpjUnico(snapshot,cnpj)) {
        alert(empresaJaExistente());
        return;
    }

}


