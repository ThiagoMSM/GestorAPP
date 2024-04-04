import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/home/Login';
import CadastroEmpresa from './src/screens/home/CadastroEmpresa';
import PaginaInicial from './src/screens/home/PaginaIncial';
import CadastroGestor from './src/screens/home/CadastroGestor';
import PaginaLogado from './src/screens/home/PaginaLogado';
const Stack = createStackNavigator();

//npx expo install react-native-gesture-handler
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native @react-navigation/stack

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> 
      <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} options={{ headerShown: false }}/>
      <Stack.Screen name="CadastroGestor" component={CadastroGestor} options={{ headerShown: false }}/>
      <Stack.Screen name="PaginaLogado" component={PaginaLogado} options={{ headerShown: false }}/>
    </Stack.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>

    //Thiago é um gostoso

  );
}
export default App;
