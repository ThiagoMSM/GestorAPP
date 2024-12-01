import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { navegaTela } from "./Funcoes";
import * as NavigationBar from 'expo-navigation-bar';
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

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
        const pegaDados = async () => {
            let CodigoParse;
            let codigo;
            try {
                CodigoParse = JSON.parse(queryCodigo);
                codigo = CodigoParse.id_produtos;
                console.log(codigo);
            } catch (error) {
                console.error("Erro no parse: ", error);
                setDados("Nenhum dado encontrado");
                CodigoParse = null;
                return;
            }

            try {
                const response = await axios.post('http://discordia.com.br/', {
                    funcao: 'consultarProdutoTODOPorId',
                    senha: '@7h$Pz!q2X^vR1&K',
                    id: codigo
                },{
                  headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                    "Accept": "application/json, text/plain, */*",
                    "Connection": "keep-alive",
                  },
                });
                if (response.data?.message === "Nenhum dado encontrado") {
                    setDados("Nenhum dado encontrado");
                } else {
                    setDados(response.data);
                }
            } catch (error) {
                console.error(CodigoParse);
                console.error("Erro na requisição: " + error);
            }
        };
        pegaDados();
    }, []);

    const renderDados = () => {
        if (typeof dados === 'string') {
            return <Text style={styles.errorText}>{dados}</Text>;
        }

        if (dados) {
            return Object.keys(dados[0]).map((key) => (
                <View key={key} style={styles.dadosItem}>
                    <Text style={styles.dadosChave}>{key}:</Text>
                    <Text style={styles.dadosValor}>{dados[0][key] ?? "Não disponível"}</Text>
                </View>
            ));
        }

        return <Text style={styles.loadingText}>Carregando...</Text>;
    };

    return (
        <LinearGradient colors={['#e39f6f', '#e04d18']} style={styles.background}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <TouchableOpacity style={styles.botaoVoltar} onPress={() => navegaTela(navigation, 'Indexador')}>
                        <Text style={styles.textoBotao}>Voltar</Text>
                    </TouchableOpacity>
                    <View style={styles.DivContainerSuperior}>
                        <Text style={styles.titulo}>CONSULTA</Text>
                        {renderDados()}
                    </View>
                </ScrollView>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingBottom: 40, // Added padding to make scrolling smoother
        paddingHorizontal: 20,
    },
    DivContainerSuperior: {
        marginTop: 60,
        alignItems: "center",
        justifyContent: "flex-start",
        width: '100%',
    },
    titulo: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 35,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    dadosItem: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background to separate items
        borderRadius: 5,
        marginVertical: 5,
        padding: 15, // Added padding to give some spacing
    },
    dadosChave: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'left',
        marginBottom: 5, // Add a bit of space between key and value
    },
    dadosValor: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 16,
        color: '#fff',
        textAlign: 'left', // Align left for better readability
        flexWrap: 'wrap',  // Ensure long text wraps around
    },
    botaoVoltar: {
        position: 'relative',
        top: 50, 
        padding: 10,
        width: "30%",
        backgroundColor: 'rgba(224, 77, 24, 0.8)',
        borderRadius: 5,
        alignItems: 'center',
        zIndex: 10, // Ensures the button stays on top
    },
    textoBotao: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 18,
        color: '#fff',
    },
    loadingText: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
    },
    errorText: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 16,
        color: 'red',
        marginTop: 20,
        textAlign: 'center',
    },
});
