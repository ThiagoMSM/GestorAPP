import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import PaginaInicial from './src/screens/home/PaginaIncial';
import Login from './src/screens/SingIn/Login';
import PaginaLogado from './src/screens/home/PaginaLogado';
import Indexador from './src/screens/home/Indexador';
import Scanner from './src/servicos/Scanner';
import Consulta from './src/servicos/Consulta';
//import CadastroEmpresa from './src/screens/SingUp/CadastroEmpresa';
//import CadastroGestor from './src/screens/SingUp/CadastroGestor';
const Stack = createStackNavigator();

//npx expo install react-native-gesture-handler
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native @react-navigation/stack
//npm install @react-native-async-storage/async-storage 
//npm install react-native-svg
//npm install expo-camera
//npx expo install expo-navigation-bar
//npx expo install expo-font
//npm i axios
function App(){
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{ headerShown: false, headerTransparent: true, headerTintColor: '#FFFFFF'}}  />
      <Stack.Screen name="Indexador" component={Indexador} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> 
      <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }}/> 
      <Stack.Screen name="PaginaLogado" component={PaginaLogado} options={{ headerShown: false }}/>
      <Stack.Screen name="Consulta" component={Consulta} options={{ headerShown: false }}/>
      {/* <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} options={{ headerShown: false }}/> */}
      {/* <Stack.Screen name="CadastroGestor" component={CadastroGestor} options={{ headerShown: false }}/> */}
    </Stack.Navigator>
   
    <StatusBar style="auto" />
    <StatusBar translucent backgroundColor="transparent" />
  </NavigationContainer>



  );
}
export default App;
