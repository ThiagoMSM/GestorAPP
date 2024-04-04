import { ref, push, set, get } from "firebase/database";
import { db } from "../DB/firebase";

export const pegaDataLogin = async (email) => {
    const LoginsRef = ref(db, 'Logins'); 
    const snapshot = await get(LoginsRef);
    let dados = null; // placeholder

    console.log("snapshot login: " + snapshot)
    snapshot.forEach((registro) => { 
        const loginRegistro = registro.val();
        console.log(loginRegistro.Email);
        if (loginRegistro.Email === email.toLowerCase()) {
            dados = loginRegistro;
        }
    });

    console.log(dados);
    return dados;
}

export const pegaDataEmpresa = async (codigo_empresa) =>{
    const EmpresasRef = ref(db, 'Empresas'); 
    const snapshot = await get(EmpresasRef);
    let dados = null; // placeholder

    console.log("snapshot empresa: " + snapshot)
    snapshot.forEach((registro) => { 
        const empresaRegistro = registro.val();
        const empresaChave = registro.key;
        console.log("chave: " + empresaChave);
        if (empresaChave === codigo_empresa) {
            dados = empresaRegistro;
        }
    });

    console.log(dados);
    return dados;
}
