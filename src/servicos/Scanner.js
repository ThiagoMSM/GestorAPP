import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { useRoute } from '@react-navigation/native';
import { irPraWeb, voltar } from "./Funcoes";
import { useNavigation } from '@react-navigation/native';
import {cameraSemPermissao, cameraPermissaoNula} from '../mensagens/Msg';

export default function Scanner(){ //codigo do git do expo
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  const {tipos,funcionamento} = route.params;
  let tiposArray;
  if (Array.isArray(tipos)) 
    tiposArray = tipos;
   else 
    tiposArray = [tipos];

  console.log(tiposArray)
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if(funcionamento === "web")
    {
        irPraWeb(data)
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