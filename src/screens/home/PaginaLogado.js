import React, { useState, useEffect } from "react";
import { Text, View, ScrollView,StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from '@react-navigation/native';
import { pegaDataLogin,pegaDataEmpresa } from "../../servicos/ServicosBD";

export default function CadastroEmpresa() {
    const [dataLogin, setDataLogin] = useState(null);
    const [dataEmpresa, setDataEmpresa] = useState(null);
    const [loginCarregado, setLoginCarregado] = useState(false);

    const route = useRoute();
    console.log("Route params:", route.params); //vem o email

    useEffect(() => {
        const listenerDadosLogin = async () => {
            try {
                const resultado = await pegaDataLogin(route.params);
                setDataLogin(resultado);
                setLoginCarregado(true); 
            } catch (error) {
                console.error("Deu ruim:", error);
            }
        };
    
        listenerDadosLogin();
    }, [route.params]);
    
    useEffect(() => {
        if (loginCarregado){
            (async () => {
                try {
                    const resultado = await pegaDataEmpresa(dataLogin.empresa_id);
                    setDataEmpresa(resultado);
                } catch (error) {
                    console.error("Deu ruim:", error);
                }
            })();
        }
    }, [loginCarregado]);
    

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#e04d18', '#1e1e1e']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.divTextTitle}>
                        <Text style={[styles.lblGestorAPP,{ fontSize: 20}]}>
                            Gestor: 
                        </Text>
                    </View>

                    <View style={styles.divTextTitle}>
                        <Text style={styles.lblGestorAPP}>
                            Nome do gestor: {dataLogin !== null ? dataLogin.Nome : "Carregando..."}
                        </Text>
                        <Text style={styles.lblGestorAPP}>
                            CPF Gestor: {dataLogin !== null ? dataLogin.CPF : "Carregando..."}
                        </Text>
                        <Text style={styles.lblGestorAPP}>
                            Email: {dataLogin !== null ? dataLogin.Email : "Carregando..."}
                        </Text>
                        <Text style={styles.lblGestorAPP}>
                            Nivel de acesso: {dataLogin !== null ? dataLogin.Nivel_acesso : "Carregando..."}
                        </Text>
                    </View>

                    <View style={styles.divTextTitle}>
                        <Text style={[styles.lblGestorAPP,{ fontSize: 20}]}>
                            Empresa do gestor: 
                        </Text>
                    </View>
                    <View style={styles.divTextTitle}>
                        <Text style={styles.lblGestorAPP}>
                            Nome empresa: {dataEmpresa !== null ? dataEmpresa.nome_empresa : "Carregando..."}
                        </Text>
                        <Text style={styles.lblGestorAPP}>
                            cnpj: {dataEmpresa !== null ? dataEmpresa.cnpj_empresa : "Carregando..."}
                        </Text>
                        <Text style={styles.lblGestorAPP}>
                            endereco: {dataEmpresa !== null ? dataEmpresa.endereco_empresa : "Carregando..."}
                        </Text>
                        <Text style={styles.lblGestorAPP}>
                            tipo empresa: {dataEmpresa !== null ? dataEmpresa.tipo_Empresa : "Carregando..."}
                        </Text>
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
    divTextTitle: {
        marginTop: "15%",
        alignItems: "center",
        justifyContent: "center",
    },
    lblGestorAPP: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
    },
});
