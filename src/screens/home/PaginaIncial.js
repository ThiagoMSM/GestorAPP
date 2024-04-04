import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { navegaTela } from '../../servicos/funcoes.js';
/*
TELA DE CADASTRO!!!!!!!!!!!!!!!!!!!!!
*/

export default function PaginaInicial() {

    const navigation = useNavigation();

    const [fontLoaded] = useFonts({
        JetBrainsMono_400Regular,
        JetBrainsMono_700Bold
    });

    if (!fontLoaded) {
        return <ActivityIndicator />;
    }

    const LogoPequenoGestor = require('../../../assets/LogoPequenoGestor.png');
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#F25C05', '#0D0D0D']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
        
            
          {/* Imagem */}
           
          <View style={styles.ImageView}>
            
                  <Image
                    source={LogoPequenoGestor}
                     style={styles.image}
                    />
                                                            
                </View>

            <View style={styles.LblTituloView}>
                <Text style={styles.LblTitulo}>
                    Bem-vindo(a)!
                </Text>
            </View>
            <View style={styles.Hr}></View>

            <View style={styles.LblDescriçãoView}>
                <Text style={styles.LblDescrição}>
                    Transfome sua gestão empresarial com o nosso APP! Controle de vendas, 
                    administração de estoque e muito mais em um só lugar. Experimente agora!
                </Text>
            </View>
            
            <View style={styles.BtnEntrarView}>
                    <TouchableOpacity onPress={() => navegaTela(navigation,'Login')} style={styles.BtnEntrar}>
                    <Text style={styles.txtBtn}>Iniciar</Text>
                </TouchableOpacity>
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
        justifyContent: 'top',
        alignItems: 'center',
    },
    
   
    txtBtn: {
        fontSize: 35,
        fontFamily: "JetBrainsMono_400Regular",
        color: "#FFFFFF",
    },
    ImageView: {
        width: 280,
        height: 280,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
    },
    image: {
        marginTop: 40,
        marginRight: 5,
        width: 500,
        height: 400,
    },
    LblTitulo: {
        marginTop: 20,
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
        marginBottom: '10px',
    },
    LblTituloView:{
    
        marginTop: 9,
    },
    Hr: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '85%',
        marginVertical: 10, // Espaçamento opcional
    },
    LblDescrição: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: '10px',

    },
    BtnEntrarView: {
        alignItems: "center",
        width: 250,
        height: 100,
        justifyContent: 'center',
        marginTop: 20,
    },
    BtnEntrar: {
        backgroundColor: "#E04D18",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        width: "90%",
        height: "auto",
        verticalAlign: 'center',
    },
  
    
   

});
