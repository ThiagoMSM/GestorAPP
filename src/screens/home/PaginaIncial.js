import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { navegaTela } from "../../servicos/Funcoes.js";
import { useNavigation } from '@react-navigation/native';

import * as NavigationBar from 'expo-navigation-bar';

import IconTelaIncial from "../../../assets/IconHandLogistica.png";

export default function PaginaInicial() {
    NavigationBar.setVisibilityAsync("hidden");


    const navigation = useNavigation();
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

    return ( 
        
        <LinearGradient colors={['#f8c6a3', '#e04d18', '#1e1e1e']} style={styles.background}>
                <View style={styles.container}>
              
            
    <View style={styles.DivContainerSuperior}>

         {/* Titulo e subtitulo */}
            <Text style={styles.lblPGG}>
                PGG
            </Text>

            <Text style={styles.lblNomeApp}>
               Pequeno Grande Gestor
            </Text>
   
           

    </View>
  
        <View style={styles.ViewImagem}>
            <Image
                source={IconTelaIncial}
                style={styles.IconImage}
            />
        </View>

            <View style={styles.ViewBemVindo}>
                <Text style={styles.LblBemVindo}>
                    Bem vindo
                </Text>
            </View>
                <Text style={styles.lblLogTech}>
                    Logística + Tecnologia
                </Text>

                <Text style={styles.lblLogTech}>
                    Empresa: Zetta
                </Text>
            <View style={styles.BtnIniciarView}>
                <TouchableOpacity onPress={() => navigation.navigate('Indexador')} style={styles.BtnIniciar}>
                    <Text style={styles.txtBtn}>Entrar</Text>
                </TouchableOpacity>
            </View>            

            </View>
        </LinearGradient>
        
    );
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
        marginTop: 60,
    },
    lblPGG: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 100,
        color: '#fff',
        marginBottom: 0,
       
    },
    ViewImagem: {
        marginTop: 30,

    },
    IconImage: {
        width: 250,
        height: 250,
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
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        marginTop: 0,
    },
    ViewBemVindo:{
        marginTop: 10,
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
        width: 350,
    },
    InputEmail: {
        marginLeft: 10,
        fontSize: 15,
        color: 'white',
    },
    InputSenha: {
        
        marginLeft: 10,
        marginTop: 40,
        fontSize: 15,
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
        borderRadius: 10,
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
