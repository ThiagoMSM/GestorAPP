import { ref, push, set, get } from "firebase/database";
import { db } from "../DB/Firebase";
import { empresaJaExistente, camposNaoPreenchidos, GestorJaExistente, LoginGestorEempresaFeito } from "../mensagens/Msg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase Authentication methods

let chaveEmpresa = 'ValorPadrao';

export const dadosCongruentes = async (dados, node, campo, valorNovo) => {
    for (let i = 0; i < dados.length; i++) {
        if (dados[i] === "") {
            alert(camposNaoPreenchidos());
            return false;
        }
    }

    const referenciaGenerica = ref(db, node);
    const snapshot = await get(referenciaGenerica);

    if (ValorNaoUnico(campo, snapshot, valorNovo)) {
        alert(empresaJaExistente());
        return false;
    }
    return true;
}

const ValorNaoUnico = (campo, snapshot, valor) => {
    let jaExiste = false;
    try {
        snapshot.forEach((childSnapshot) => {
            const registroTraduzido = childSnapshot.val();
            if (registroTraduzido[campo] === valor) {
                jaExiste = true;
                throw 'Empresa não única';
            }
        });
    } catch (excecao) {
        console.log("erro: " + excecao);
    } finally {
        return jaExiste;
    }
};

export const obtemKeyEmpresa = async (infoEmpresa, cnpj) => {
    if (await dadosCongruentes(infoEmpresa, 'Empresas', 'cnpj_empresa', cnpj)) {
        const empresasReferencia = ref(db, 'Empresas');
        chaveEmpresa = await push(empresasReferencia);
        return true;
    }
    return false;
}

export const CadastrarGestor = async (EmailGestor, CPF, Senha, NomeGestor) => {
    if (!await dadosCongruentes([EmailGestor, CPF, Senha, NomeGestor], 'Logins', 'Email', EmailGestor))
        return false;

    const LoginsRef = ref(db, 'Logins');
    const novoNodeLogin = push(LoginsRef);
    try {
        // Create user with email and password using Firebase Authentication
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, EmailGestor, Senha);

        // Save user data to the database
        await set(novoNodeLogin, {
            Nome: NomeGestor,
            Email: EmailGestor,
            CPF: CPF,
            Nivel_acesso: 2,
            empresa_id: chaveEmpresa.key
        });

    } catch (excecao) {
        console.error("Error:", excecao);
    }
    return true;
};

export const CadastrarEmpresa = async (nomeEmpresa, cnpj, endereco, tipoEmpresa) => {
    if (!await dadosCongruentes([nomeEmpresa, cnpj, endereco, tipoEmpresa], 'Empresas', 'cnpj_empresa', cnpj))
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
