import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CadastrarGestor } from '../../CodersPika/funcoes.js';
import { navegaTela } from '../../CodersPika/funcoes.js';
import { useNavigation } from '@react-navigation/native';

export default function CadastroEmpresa() {
   
    const navigation = useNavigation();

    const [EmailGestor, setEmailGestor] = useState("");
    const [CPF, setCPFGestor] = useState("");
    const [Senha, setSenhaGestor] = useState("");

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#e04d18', '#1e1e1e']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContent}>

  
                <View style={styles.ViewBtnVoltar}>
                    <TouchableOpacity onPress={() => navegaTela(navigation, 'Login')} style={styles.btn}>
                    <Text style={styles.txtBtn}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            
                    <Text style={styles.lblCadastro}>
                            Cadastro Gestor
                        </Text>

                    <View style={styles.form}>
                        <View style={styles.cardForm}>

                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setEmailGestor(text)}
                                value={EmailGestor}
                            />
                              <TextInput
                                keyboardType = 'numeric'
                                style={styles.input}
                                placeholder="CPF"
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setCPFGestor(text)}
                                value={CPF}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                placeholderTextColor="#878787"
                                secureTextEntry={true}
                                onChangeText={(text) => setSenhaGestor(text)}
                                value={Senha}
                            />
                          

                            <TouchableOpacity onPress={() => CadastrarGestor(EmailGestor,CPF,Senha)}  style={styles.btn}>
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
        marginTop: "2%",
    },
    divTextTitle: {
        marginTop: "0%",
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
