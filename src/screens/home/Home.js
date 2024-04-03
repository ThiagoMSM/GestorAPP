import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { Cadastrar, entrar, navegaTela } from '../../CodersPika/funcoes.js';
/*
TELA DE CADASTRO!!!!!!!!!!!!!!!!!!!!!
*/

export default function Home() {

    const navigation = useNavigation();

    const [fontLoaded] = useFonts({
        JetBrainsMono_400Regular,
        JetBrainsMono_700Bold
    });
    //const [email, setEmail] = useState("");
    
    if (!fontLoaded) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#e04d18', '#1e1e1e']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
            {/*
                <View style={styles.ViewBtnVoltar}>
                    <TouchableOpacity onPress={() => VoltarTela(navigation)} style={styles.btn}>
                    <Text style={styles.txtBtn}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                */}
                    {/* Titulo e subtitulo */}
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

                    {/* Div do quadrado cinza da tela */}
                    <View style={styles.form}>
                    
                        <View style={styles.cardForm}>
                            {/* Input de email */}
                            <Text style={styles.lblLogTech}>
                                Já possui uma conta? Entre preenchendo o login abaixo:
                             </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#878787"
                            />
                            {/* Input de senha */}
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                secureTextEntry={true}
                                placeholderTextColor="#878787"
                            />
                           {/* Botão de cadastro */}
                            <View style={styles.BtnCadastrarView}>
                            <TouchableOpacity /*onPress={() => navegaTela(navigation,'TelaTeste')}*/ style={styles.btn}>
                                    <Text style={styles.txtBtn}>entrar</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.lblLogTech}>
                                Cadastre sua empresa e torne-se o gestor clicando no botão abaixo.
                             </Text>

                            {/* Botão de cadastro */}
                            <View style={[styles.BtnCadastrarView, {width:"170%"}] }>
                                <TouchableOpacity onPress={() => navegaTela(navigation,'CadastroEmpresa')} style={styles.btn}>
                                    <Text style={styles.txtBtn}>Cadastrar Empresa</Text>
                                </TouchableOpacity>
                            </View>

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
    },
    divTextTitle: {
        marginTop: "15%",
    },
    divTextSubTitle: {
        alignItems: "center",
        justifyContent: "center",
    },
    lblLogTech: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'JetBrainsMono_400Regular',
    },
    form: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
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
        backgroundColor: "white",
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
        verticalAlign: 'center',
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
        marginTop: -120,
        width: '50%',
        height: 'auto',


    }
   

});
