import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Button, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { navegaTela } from '../../servicos/Funcoes';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { camposNaoPreenchidos, LoginFalha } from '../../mensagens/Msg.js';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { app } from "../../BD/Firebase.js";
import * as NavigationBar from 'expo-navigation-bar';
import * as Animatable from 'react-native-animatable';
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
//   }); // teste

export default function Login() {
    NavigationBar.setVisibilityAsync("hidden");
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fontLoaded] = useFonts({
        JetBrainsMono_400Regular,
        JetBrainsMono_700Bold
    });
    if (!fontLoaded) {
        return <ActivityIndicator />;
    }
    const ClearValue = () => {
        setPassword('');
        setEmail('');
      };
      const IconVoltar = () => {

        this.viewRef.fadeOutLeft(500).then(() => {
          // Navega para outra tela
          navigation.navigate('PaginaInicial');
        });
      };

    return ( 
    <LinearGradient colors={['#f8c6a3','#e04d18','#1e1e1e']} style={styles.background}>
        <View style={styles.container}>
              
        <TouchableOpacity onPress={IconVoltar} style={styles.BtnViewVoltar}>
            <Animatable.View ref={(ref) => (this.viewRef = ref)} animation={'fadeInLeft'} delay={500} >
                <Image
                    source={require('../../../assets/IconBox.png')}
                    style={styles.IconImage}
                />
            </Animatable.View>
        </TouchableOpacity>
        
    <View style={styles.DivContainerSuperior}>
         {/* Titulo e subtitulo */}
            <Text style={styles.lblPGG}>
                PGG
            </Text>

            <Text style={styles.lblNomeApp}>
               Pequeno Grande Gestor
            </Text>
    </View>

        <View style={styles.Cardform}>
            
            <TextInput
                style={styles.InputEmail}
                placeholder="emailexemplo@gmail.com"
                placeholderTextColor="#rgba(255, 255, 255, 0.7)"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <View style={styles.BorderHr}><View style={styles.Hr}></View></View>


            <TextInput
                style={styles.InputSenha}
                placeholder="**************************"
                secureTextEntry={true}
                placeholderTextColor="#rgba(255, 255, 255, 0.7)"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <View style={styles.Hr}></View>
            
            <View style={styles.ViewEsqueciSenha}><Text style={styles.LblEsqueciSenha}>Esqueci a senha!</Text></View>

        </View>
               
                
           
            
            <View style={styles.BtnIniciarView}>
                <TouchableOpacity onPress={() => logar(email,password,navigation)} style={styles.BtnIniciar}>
                    <Text style={styles.txtBtn}>Logar</Text>
                </TouchableOpacity>
            </View>            
            




        </View>
    </LinearGradient>
    );
};


async function logar(email,password,navigation) {
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        navegaTela(navigation,'PaginaLogado',email)
    } catch (erro) {
        let a = erro.message;

        if(email === ""|| password === ""){
            alert(camposNaoPreenchidos());
            return;
        }
        if(a == "Firebase: Error (auth/invalid-email)."){
            alert(LoginFalha());
            return;
        }
    }
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
    },
    DivContainerSuperior: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    lblPGG: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 100,
        color: '#fff',
        marginBottom: 0,
       
    },
    ViewImagem: {
        
    },
    BtnViewVoltar: {
        width: "100%",
        height: 100,
        marginBottom: -70,
        marginTop: 40,
        marginLeft: -10,
       
    },
    IconImage: {
        width: 100,
        height: 100,
    },
    lblNomeApp:{
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 10,
        color: '#fff',
        textAlign: 'center',
        marginTop: -20,
    },
    lblLogTech: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
    },
    ViewBemVindo:{
        marginTop: 50,
    },
    LblBemVindo: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 50,
        color: '#fff',
        textAlign: 'center',

    },
    Cardform: {
     
        justifyContent: 'center',
        marginTop: 50,
        width: 280,
    },
    InputEmail: {
        marginLeft: 10,
        fontSize: 20,
        color: 'white',
    },
    InputSenha: {
        
        marginLeft: 10,
        marginTop: 40,
        fontSize: 20,
        color: 'white',
    },  
    Hr: {
        backgroundColor: 'white',
        width: '100%',
        height: 5,
        marginTop: 5,
        marginBottom: 5,
        
        
        borderRadius: 50,
      
    },
   
    ViewEsqueciSenha: {
        fontFamily: 'JetBrainsMono_700Bold',
        alignItems: "flex-end",
        marginTop: 5,
    },  
    LblEsqueciSenha: {
        color: 'rgba(240, 240, 240, 0.8)',
        fontSize: 15,
    },  
    BtnIniciarView: {
        alignItems: "center",
        justifyContent: 'center',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 60,
    },
    txtBtn: {
        fontSize: 15,
        fontFamily: "JetBrainsMono_400Regular",
        color: "#e04d18",
    },
    BtnIniciar: {
        backgroundColor: "#FFFF",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: 'center',
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
        
        borderRadius: 10,
        width: 200,
        height: 50,
    },
    LblCadastrar: {
        color: 'white',
        marginTop: 10,
    }
 
  
    
});
