import { Linking } from 'react-native';
import {enderecoInvalidoHttps, camposNaoPreenchidos} from '../mensagens/Msg';

export const navegaTela = (navigation, telaAlvo, params) =>{
    navigation.navigate(telaAlvo, params);
};

export const voltar = (navigation) => {
    navigation.goBack();
}

export const limparCampo = (setStates) => { //espera array de campos ou setStates
    if (!Array.isArray(setStates)){
        setStates(""); 
        return;
    }
    setStates.forEach(state =>{
        state("");
    });
    // TODO
}

export const CheckCamposVazios = (campos) =>{
    console.log(campos);
    if(!Array.isArray(campos)) // se só foi informado um campo
        return campos === "";

    for(let i=0; i<campos.length;i++){ // se foi informado mais de um campo, looping para checar todos
        if(campos[i] === "")
            return true
    }
    return false;
}

export const irPraWeb = (endereco) =>{ // talvez mude tudo isso pra um axios da vida, mas por enquanto ta sussa

    if(CheckCamposVazios(endereco)){
        alert(camposNaoPreenchidos(false));
        return;
    }

    const chars = endereco.split('');
    let enderecoPuro = endereco.split('.')[0];

    let dominio = "";
    let dominios = [];

    let dominioInformado = false;
    let https = false;
    
    for(let i=0; i<chars.length;i++){
        let auxChars = "";
        if(chars[i] == '.'){
            dominioInformado = true;
            while (chars[i + 1] != '.')
            {
                auxChars += chars[i+1];
                i++;
                if (i + 1 >= chars.length)
                    break;
            }
            dominios.push("." + auxChars); 
        }else if (chars[i] == '/' && chars[i+1] == '/'){
            https = true;
        }
    }
        // dar erro aqui se o dominio nao existir em nosso bd de dominios disponiveis
    if(!dominioInformado)
        dominio = ".com"; // assumimos tal dominimo, se nao for informado nada... depois mudar pro dominio do azure... tbm ter uma lista dos dominios disponiveis em um bd
    else{
        dominios.forEach(dom =>{
            dominio += dom;
        });
    }
    
    let url = https ? enderecoPuro + dominio : url = "https://" + enderecoPuro + dominio;
    Linking.openURL(url)
        .then(() => {
            // TODO, talvez o download da package aqui...
        })
        .catch(error => {
            alert(enderecoInvalidoHttps());
    });
}
