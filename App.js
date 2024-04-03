import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/home/Home';
import CadastroEmpresa from './src/screens/home/CadastroEmpresa';
const Stack = createStackNavigator();

//npx expo install react-native-gesture-handler
//npx expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native @react-navigation/stack
function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/> 
      <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} options={{ headerShown: false }}/>
    </Stack.Navigator>
    <StatusBar style="auto" />
  </NavigationContainer>

    //Thiago é um gostoso

  );
}
export default App;
