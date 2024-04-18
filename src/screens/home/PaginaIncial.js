import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { navegaTela } from '../../servicos/Funcoes.js';




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

    
    return ( 
        <View style={styles.container}>
            <LinearGradient colors={['#EF8C34', '#EF8C34']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
        
         {/* Titulo e subtitulo */}
         <View style={styles.divTextTitle}>
            <Text style={styles.lblGestorAPP} onPress={() => navegaTela(navigation, 'CadastroGestor')}>
                Gestor APP
            </Text>
        </View>
                    
      <View style={styles.divTextSubTitle}>
         <Text style={styles.lblLogTech}>
            Logística + Tecnologia
         </Text>
      </View>
                    
            <View style={styles.LblTituloView}>
                <Text style={styles.LblTitulo}>
                    Bem-vindo(a)!
                </Text>
            </View>
            <View style={styles.Hr}></View>


            <View style={styles.Cardform}>

            <View style={styles.LblDescriçãoView}>
                <Text style={styles.LblDescrição}>
                    Transfome sua gestão empresarial com o nosso APP! 
                </Text>
                

            </View>

            </View>
                <Text style={styles.LblExperimenteAgr}>
                  Experimente agora!
                </Text>
                
           
            
            <View style={styles.BtnIniciarView}>
                <TouchableOpacity onPress={() => navegaTela(navigation,'Indexador')} style={styles.BtnIniciar}>
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
  
    ImageView: {
        height: 160,
        width: 160,
        marginTop: 90,
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle'
    },
    image: {
        marginTop: 60,
        marginRight: 5,
        width: 500,
        height: 400,
    },
    LblTitulo: {
        marginTop: 150,
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 30,
        color: '#fff',
        textAlign: 'center',
        marginBottom: '10px',
    },
    LblTituloView:{
        
        marginTop: 60,
    },
    Hr: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        width: '75%',
        marginTop: 5,
        marginBottom: 5,
    },
    LblDescrição: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',

    },
    LblDescriçãoView: {
        width: 300,
        marginLeft: -14,
    
        
    },
    BtnIniciarView: {
        alignItems: "center",
        width: 250,
        height: 100,
        justifyContent: 'center',
        
    },
    LblExperimenteAgr: {
        marginTop: 20,
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        marginBottom: -15,
    },
    txtBtn: {
        fontSize: 25,
        fontFamily: "JetBrainsMono_400Regular",
        color: "#EF8C34",
    },
    BtnIniciar: {
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
        width: "90%",
        height: "auto",
        verticalAlign: 'center',
    },
    
    Cardform: {
        backgroundColor: 'rgba(217,217,217,0)',
        shadowColor: '#000',
        shadowOpacity: 100,
        shadowRadius: 10,
        width: "80%",
        padding: 18,
        borderRadius: 30,
        alignSelf: 'center',
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
        marginTop: 5,
    },
    lblGestorAPP: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 50,
        color: '#fff',
        textAlign: 'center',
        marginBottom: '10px',
    },
    divTextTitle: {
        marginTop: 140,
    }
});
