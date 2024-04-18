import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const navegaTela = (navigation, telaAlvo, params) =>{
    navigation.navigate(telaAlvo, params);
};

export const voltar = (navigation) => {
    navigation.goBack();
}

export const irPraWeb = (endereco) =>{
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

    if(!dominioInformado)
        dominio = ".com"; // assumimos tal dominimo, se nao for informado nada... depois mudar pro dominio do azure... tbm ter uma lista 
    else{
        dominios.forEach(dom =>{
            dominio += dom;
        });
    }

    const url = https ? enderecoPuro + dominio : url = "https://" + enderecoPuro + dominio;
    Linking.openURL(url);
}
