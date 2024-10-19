import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, BackHandler } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useRoute } from '@react-navigation/native';
import { irPraWeb, voltar, navegaTela } from "./Funcoes";
import { useNavigation } from '@react-navigation/native';
import { cameraSemPermissao, cameraPermissaoNula } from '../mensagens/Msg';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  const { tipos, funcionamento, msg, tamanhoX = 200 } = route.params;
  let tiposArray;
  if (Array.isArray(tipos))
    tiposArray = tipos;
  else
    tiposArray = [tipos];

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();

    // Cleanup function
    return () => {
      setHasPermission(null); // Reset permission state
    };
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      voltar(navigation);
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    return () => backHandler.remove(); // Cleanup back button listener
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (funcionamento === "web") {
      irPraWeb(data);
      voltar(navigation);
    } else if (funcionamento === "consulta") {
      navegaTela(navigation, 'Consulta', {queryCodigo: data})
    }
  };

  if (hasPermission === null) {
    return <Text>{cameraPermissaoNula()}</Text>; // Display message when permission is null
  }
  if (hasPermission === false) {
    return <Text>{cameraSemPermissao()}</Text>; // Display message when permission is denied
  }

  return (
    <View style={styles.container}>

      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: tiposArray
        }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <View style={styles.viewVoltar}>
          <TouchableOpacity style={styles.TOvoltar} onPress={()=> voltar(navigation)}>
            <Text style={styles.voltarText}>Voltar</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.topOverlay} />

        <View style={styles.middleOverlay}>
          <View style={styles.sideOverlay} />
          <View style={[styles.focusedArea, { width: tamanhoX }]} />
          <View style={styles.sideOverlay} />
        </View>

        <View style={styles.bottomOverlay}>
          <Text style={styles.instructionText}>{msg}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TOvoltar:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: 80,
    height: 30,
    justifyContent: 'center',
    flex: 1
  },
  viewVoltar: {
    position: 'absolute', // Use absolute positioning
    top: '15%', // Adjust this value to move it vertically
    left: 20, // Adjust this value to move it horizontally
    flexDirection: "column",
    justifyContent: "flex-start",
    zIndex: 1, // Ensure it appears above other elements
  },
  voltarText: {
    color: '#fff', // Change text color as needed
    textAlign: 'center',
    fontSize: 16, // Adjust font size if necessary
  },

  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  middleOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideOverlay: {
    flex: 1,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  focusedArea: {
    width: 200,
    height: 200,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: 'transparent', // Make this area transparent
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
  },
});
