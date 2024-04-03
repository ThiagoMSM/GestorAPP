import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CadastrarEmpresa } from '../../CodersPika/funcoes.js';

export default function CadastroEmpresa() {
   
    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [tipoEmpresa, setTipoEmpresa] = useState("");

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#e04d18', '#1e1e1e']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContent}>

  
                <View style={styles.ViewBtnVoltar}>
                    <TouchableOpacity onPress={() => VoltarTela(navigation)} style={styles.btn}>
                    <Text style={styles.txtBtn}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            

                    <View style={styles.divTextTitle}>
                        <Text style={styles.lblGestorAPP}>
                            Gestor APP
                        </Text>
                    </View>

                    <View style={styles.divTextSubTitle}>
                        <Text style={styles.lblLogTech}>
                            Logística + Tecnologia
                        </Text>
                    </View>
                    <Text style={styles.lblCadastro}>
                            Cadastro
                        </Text>

                    <View style={styles.form}>
                        <View style={styles.cardForm}>

                            <TextInput
                                style={styles.input}
                                placeholder="Nome da empresa"
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setNomeEmpresa(text)}
                                value={nomeEmpresa}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="CNPJ"
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setCnpj(text)}
                                value={cnpj}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Endereço"
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setEndereco(text)}
                                value={endereco}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tipo de empresa"
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setTipoEmpresa(text)}
                                value={tipoEmpresa}
                            />

                            <TouchableOpacity onPress={() => CadastrarEmpresa(nomeEmpresa,cnpj,endereco,tipoEmpresa)}  style={styles.btn}>
                                <Text style={styles.txtBtn}>Cadastrar</Text>
                            </TouchableOpacity>


                            
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    lblGestorAPP: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
        marginBottom: '10px',
    },
    lblCadastro: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
     
    },
    divTextTitle: {
        marginTop: "15%",
    },
    divTextSubTitle: {
        alignItems: "center",
        justifyContent: "center",
    },
    lblLogTech: {
        fontSize: 11,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'JetBrainsMono_400Regular',
    },
    form: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    cardForm: {
        backgroundColor: 'rgba(217,217,217,0.22)',
        shadowColor: '#000',
        shadowOpacity: 3,
        shadowRadius: 10,
        width: "80%",
        padding: 18,
        borderRadius: 30,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: "#EDEDED",
        width: "90%",
        padding: 12,
        paddingLeft: 20,
        borderRadius: 30,
        fontFamily: "JetBrainsMono_400Regular",
        fontSize: 20,
        margin: 18,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
    },
    btn: {
        backgroundColor: "#E04D18",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
        margin: 15,
        width: "55%",
        height: 40,
    },
    txtBtn: {
        fontSize: 20,
        fontFamily: "JetBrainsMono_400Regular",
        color: "#FFFFFF",
    },
    txtEsqueceu: {
        fontFamily: "JetBrainsMono_400Regular",
        color: "#FFFFFF",
        textDecorationLine: "underline",
        marginTop: -10,
        fontSize: 12,
    },

    ViewBtnVoltar: {
        marginTop: 0,
        width: '50%',
        height: 'auto',
    },
});
