import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "./Screens/FeedScreen";
import DetallesScreen from "./Screens/DetallesScreen";
import CarritoScreen from "./Screens/CarritoScreen";
import CategoriasScreen from "./Screens/CategoriasScreen";
import PerfilScreen from "./Screens/PerfilScreen";
import ProductosContextProvider from "./context/ProductosContext";
import AuthProvider from "./context/Auth"; 
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = ({ carrito, setCarrito }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" options={{ headerShown: false }}>
        {(props) => <FeedScreen {...props} carrito={carrito} setCarrito={setCarrito} />}
      </Stack.Screen>
      <Stack.Screen name="Detalles" options={{ headerShown: false }}>
        {(props) => <DetallesScreen {...props} carrito={carrito} setCarrito={setCarrito} />}
      </Stack.Screen>
      <Stack.Screen name="Carrito" options={{ headerShown: false }}>
        {(props) => <CarritoScreen {...props} carrito={carrito} setCarrito={setCarrito} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const App = () => {
  const [carrito, setCarrito] = useState([]);

  return (
    <ProductosContextProvider>
      <AuthProvider> 
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Feed') {
                  iconName = 'home-outline';
                } else if (route.name === 'Categorías') {
                  iconName = 'grid-outline';
                } else if (route.name === 'Perfil') {
                  iconName = 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#8e44ad',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            })}
          >
            <Tab.Screen name="Feed" options={{ title: 'Artesan Shop' }}>
              {(props) => <FeedStack {...props} carrito={carrito} setCarrito={setCarrito} />}
            </Tab.Screen>
            <Tab.Screen name="Categorías">
              {(props) => <CategoriasScreen {...props} />}
            </Tab.Screen>
            <Tab.Screen name="Perfil">
              {(props) => <PerfilScreen {...props} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ProductosContextProvider>
  );
};

export default App;