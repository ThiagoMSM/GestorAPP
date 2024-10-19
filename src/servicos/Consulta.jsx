import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { navegaTela } from './Funcoes';
import * as NavigationBar from 'expo-navigation-bar';
import axios from "axios";


export default function Consulta() {
    NavigationBar.setVisibilityAsync("hidden");
    const navigation = useNavigation();

    const route = useRoute();
    const { queryCodigo } = route.params;
    const [dados, setDados] = useState(null);

    const [fontLoaded] = useFonts({
        JetBrainsMono_400Regular,
        JetBrainsMono_700Bold
    });

    if (!fontLoaded) {
        return <ActivityIndicator />;
    }


    useEffect(() => {
        const pegaDados = async () => { // função existe para separar async do useEffect...
            let CodigoParse;
            let codigo
            try {
                CodigoParse = JSON.parse(queryCodigo);
                codigo = CodigoParse.id_produtos;
                console.log(codigo)
            } catch (error) {
                console.error("Erro no parse: ", error);
                CodigoParse = null;
                return;
            }

            try {
                const response = await axios.post('http://pggzettav3.mooo.com/api/index.php', {               
                    funcao: 'consultarProdutoTODOPorId', 
                    senha: '@7h$Pz!q2X^vR1&K',
                    id: 1
                });
                if(response.data?.message == "Nenhum dado encontrado"){
                    setDados("Nenhum dado encontrado")
                }else{
                    setDados(response.data)
                }
                
                console.log(response.data)
            } catch (error) {
                console.error(CodigoParse)
                console.error("deu ruim: " + error) // log para sabermos qual foi o erro
            }
        };
        pegaDados(); //chama a função
    }, [])



    return (
        <LinearGradient colors={['#f8c6a3', '#e04d18', '#1e1e1e']} style={styles.background}>
            <View style={styles.container}>

                <View style={styles.DivContainerSuperior}>
                    <Text style={styles.titulo}>
                        CONSULTA
                    </Text>

                    <Text>
                        {dados ? JSON.stringify(dados) : "Carregando..."}
                    </Text>

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
        marginTop: -10,
    },
    titulo: {
        marginTop: 50,
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 30,
        color: '#fff',
        marginBottom: 0,

    },

});
