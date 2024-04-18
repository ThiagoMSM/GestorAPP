import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/signIn/Login';
import PaginaInicial from './src/screens/home/PaginaIncial';
import PaginaLogado from './src/screens/home/PaginaLogado';
import Indexador from './src/screens/home/Indexador';
const Stack = createStackNavigator();

//npx expo install react-native-gesture-handler
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native @react-navigation/stack
//npm install @react-native-async-storage/async-storage 
//npm install react-native-svg

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="PaginaInicial" component={PaginaInicial} options={{ headerShown: false }}/>
      <Stack.Screen name="Indexador" component={Indexador} options={{ headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> 
      <Stack.Screen name="PaginaLogado" component={PaginaLogado} options={{ headerShown: false }}/>
    </Stack.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>
    //Thiago é um gostoso

  );
}
export default App;
