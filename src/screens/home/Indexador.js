import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { navegaTela } from "../../servicos/Funcoes";
import * as NavigationBar from 'expo-navigation-bar';
import * as Animatable from 'react-native-animatable';

import IconUrl from '../../../assets/IconURL2.png';
import PngScannerQRCODE from '../../../assets/qr-code.png';

export default function Indexador() {
    NavigationBar.setVisibilityAsync("hidden");
    const navigation = useNavigation();
    const [fontLoaded] = useFonts({
        JetBrainsMono_400Regular,
        JetBrainsMono_700Bold
    });
    const [endereco, setEndereco] = useState('');
    if (!fontLoaded) {
        return <ActivityIndicator />;
    }

    const IconVoltar = () => {
        this.viewRef.fadeOutLeft(500).then(() => {
            // Navega para outra tela
            navigation.navigate('PaginaInicial');
        });
    };
    return (
        <LinearGradient colors={['#243447', '#1e293b', '#16202e']} style={styles.background}>
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

                <View style={styles.BtnIniciarView}>
                    <Text style={styles.lblFuncionalidades}>
                        Funcionalidades:
                    </Text>
                    <View style={{ height: 10 }} />
                    <TouchableOpacity onPress={() => navegaTela(navigation, 'Scanner', { tipos: "qr", funcionamento: "consulta", msg: "Alinhe o código QR" })} style={styles.BtnIniciar}>
                        <Image
                            source={PngScannerQRCODE}
                            style={styles.IconQrCode}
                        />
                        <Text style={styles.txtBtnQrCode}>Consultar Produto</Text>
                    </TouchableOpacity>
                    <View style={{ height: 30 }} />
                    <TouchableOpacity onPress={() => navegaTela(navigation, 'Scanner', { tipos: "qr", funcionamento: "web", msg: "Alinhe o código de barras", tamanhoX: 300 })} style={styles.BtnIniciar}>
                        <Image
                            source={PngScannerQRCODE}
                            style={styles.IconQrCode}
                        />
                        <Text style={[styles.txtBtnQrCode, {maxWidth: "70%"}]}>Consultar Código de barras</Text>
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
        marginTop: -10,
    },
    lblPGG: {
        marginTop: 50,
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 100,
        color: '#fff',
        marginBottom: 0,

    },
    lblFuncionalidades: {
        fontFamily: 'JetBrainsMono_400Regular',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
    },
    BtnViewVoltar: {

        width: "100%",
        height: 100,
        marginBottom: -70,
        marginTop: 40,
        marginLeft: -10,
    },
    ViewImagem: {

    },
    IconImage: {
        width: 100,
        height: 100,
    },
    ViewIconURL: {
        display: 'inline-block',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -35,
        marginLeft: 0,
        zIndex: 1,
    },
    IconImageURL: {
        width: 80,
        height: 80,

    },
    ViewIconEntregador: {
        display: 'inline-block',
        width: 130,
        height: 130,
        marginTop: -30,
    },
    IconEntregador: {
        width: 130,
        height: 130,
    },
    lblNomeApp: {
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
    ViewBemVindo: {
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
        marginTop: 90,
        width: 280,
    },
    InputUrl: {
        marginLeft: 50,
        fontSize: 17,
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
        marginTop: 100,
    },
    BtnProsseguirView: {
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    BtnProsseguir: {
        backgroundColor: "#FFFF",
        alignItems: "center",
        justifyContent: "center",
        verticalAlign: 'center',
        borderRadius: 10,
        width: 130,
        height: 50,
    },

    txtBtn: {
        fontSize: 15,
        fontFamily: "JetBrainsMono_400Regular"
    },
    BtnIniciar: {
        backgroundColor: "#FFFF",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        verticalAlign: 'center',
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,

        borderRadius: 10,
        width: 300,
        height: 80,
    },
    LblCadastrar: {
        color: 'white',
        marginTop: 10,
    },
    IconQrCode: {
        marginLeft: -20,
        width: 70,
        height: 70,
    },
    txtBtnQrCode: {
        marginLeft: 10,
        fontSize: 18,
        fontFamily: "JetBrainsMono_400Regular",
        color: "#1e293b",
    },

});
