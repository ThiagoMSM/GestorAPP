import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
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
            let codigo;
            try {
                CodigoParse = JSON.parse(queryCodigo);
                codigo = CodigoParse.id_produtos;
                console.log(codigo);
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
                if (response.data?.message == "Nenhum dado encontrado") {
                    setDados("Nenhum dado encontrado");
                } else {
                    setDados(response.data);
                }
            } catch (error) {
                console.error(CodigoParse);
                console.error("deu ruim: " + error); // log para sabermos qual foi o erro
            }
        };
        pegaDados(); //chama a função
    }, []);

    const renderDados = () => {
        if (typeof dados === 'string') {
            return <Text>{dados}</Text>;
        }

        if (dados) {
            return Object.keys(dados[0]).map((key) => (
                <View key={key} style={styles.dadosContainer}>
                    <Text style={styles.dadosChave}>{key}:</Text>
                    <Text style={styles.dadosValor}>{dados[0][key] ?? "Não disponível"}</Text>
                </View>
            ));
        }

        return <Text>Carregando...</Text>;
    };

    return (
        <LinearGradient colors={['#f8c6a3', '#e04d18', '#1e1e1e']} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                    <Text style={styles.textoBotao}>Voltar</Text>
                </TouchableOpacity>
                <View style={styles.DivContainerSuperior}>
                    <View style={styles.objetoTransparente} />
                    <Text style={styles.titulo}>CONSULTA</Text>
                    {renderDados()}
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
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',     
    },
    DivContainerSuperior: {
        alignItems: "center",
        justifyContent: "center",
        width: '80%',
        position: 'relative',
    },
    objetoTransparente: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0, 
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 10, 
        zIndex: -1, 
    },
    titulo: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 35, 
        color: '#fff',
        marginBottom: 20, 
        textAlign: 'center', 
    },
    dadosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: '100%', 
        marginVertical: 8, 
    },
    dadosChave: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 18, 
        color: '#fff',
        textAlign: 'left', 
    },
    dadosValor: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 18, 
        color: '#fff',
        textAlign: 'right',
    },
    botaoVoltar: {
        position: 'absolute',
        top: 40, // Distância do topo
        left: 20, // Distância da esquerda
        padding: 10,
        backgroundColor: 'rgba(224, 77, 24, 0.8)', // Cor com leve transparência
        borderRadius: 5,
        alignItems: 'center',
    },
    textoBotao: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 18,
        color: '#fff',
    },
});
