import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, BackHandler } from "react-native"; // Updated import
import { CameraView, Camera } from "expo-camera/next";
import { useRoute } from '@react-navigation/native';
import { irPraWeb, voltar } from "./funcoes";
import { useNavigation } from '@react-navigation/native';

import { cameraSemPermissao, cameraPermissaoNula } from '../mensagens/Msg';

export default function Scanner() {  //codigo do git modificado
  const [hasPermission, setHasPermission] = useState(null); 
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  const { tipos, funcionamento } = route.params;
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
    }
    voltar(navigation);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>{cameraPermissaoNula()}</Text>; // fazer style
  }
  if (hasPermission === false) {
    return <Text>{cameraSemPermissao()}</Text>; // fazer style
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
    </View>
  );
}

const styles = StyleSheet.create({ //talvez dar uma reformulada aqui tbm...
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
