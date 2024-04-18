import { Linking } from 'react-native';

export const navegaTela = (navigation, telaAlvo, params) =>{
    navigation.navigate(telaAlvo, params);
};

export const irPraWeb = (endereco) =>{
    const chars = endereco.split('');
    let enderecoPuro = endereco.split('.')[0];

    let dominio = "";
    let dominios = [];

    let dominioInformado = false;

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
        }
    }

    if(!dominioInformado)
        dominio = ".com";
    else{
        dominios.forEach(dom =>{
            dominio += dom;
        });
    }

    const url = "https://" + enderecoPuro + dominio;
    Linking.openURL(url);
}
