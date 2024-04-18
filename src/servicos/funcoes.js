import { Linking } from 'react-native';
import {enderecoInvalidoHttps, camposNaoPreenchidos} from '../mensagens/Msg';

export const navegaTela = (navigation, telaAlvo, params) =>{
    navigation.navigate(telaAlvo, params);
};

export const voltar = (navigation) => {
    navigation.goBack();
}

export const irPraWeb = (endereco) =>{ // talvez mude tudo isso pra um axios da vida, mas por enquanto ta sussa

    if(endereco === ""){
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
