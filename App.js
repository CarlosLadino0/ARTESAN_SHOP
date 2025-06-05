import React, { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import FeedScreen from "./Screens/FeedScreen";
import DetallesScreen from "./Screens/DetallesScreen";
import CarritoScreen from "./Screens/CarritoScreen";
import CategoriasScreen from "./Screens/CategoriasScreen";
import PerfilScreen from "./Screens/PerfilScreen";
import LoginScreen from "./Screens/LoginScreen";    
import VenderProductoScreen from "./Screens/VenderProductoScreen";
import RegistroScreen from "./Screens/RegistroScreen";   
import ProductosContextProvider from "./context/ProductosContext";
import AuthProvider from "./context/Auth";
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoriaProductosScreen from './Screens/CategoriaProductosScreen';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStack = ({ carrito, setCarrito }) => (
  <Stack.Navigator 
    screenOptions={{
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      headerShown: false
    }}
  >
    <Stack.Screen name="HomeFeed">
      {(props) => <FeedScreen {...props} carrito={carrito} setCarrito={setCarrito} />}
    </Stack.Screen>
    <Stack.Screen name="Detalles">
      {(props) => <DetallesScreen {...props} carrito={carrito} setCarrito={setCarrito} />}
    </Stack.Screen>
    <Stack.Screen name="Carrito">
      {(props) => <CarritoScreen {...props} carrito={carrito} setCarrito={setCarrito} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const TabNavigator = ({ carrito, setCarrito }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Categorías') iconName = 'grid-outline';
        else if (route.name === 'Perfil') iconName = 'person-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#8e44ad',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" options={{ title: 'Artesan Shop' }}>
      {(props) => <HomeStack {...props} carrito={carrito} setCarrito={setCarrito} />}
    </Tab.Screen>
    <Tab.Screen name="Categorías" component={CategoriasScreen} />
    <Tab.Screen name="Perfil" component={PerfilScreen} />
  </Tab.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false
    }}
  >
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Registro" component={RegistroScreen} />
  </AuthStack.Navigator>
);

const App = () => {
  const [carrito, setCarrito] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a notificación:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider> 
        <ProductosContextProvider>
          <AuthProvider>
            <NavigationContainer>
                  <Stack.Navigator
                    screenOptions={{
                      gestureEnabled: true,
                      gestureDirection: 'horizontal',
                      headerShown: false
                    }}
                  >
                    <Stack.Screen name="MainTabs">
                  {(props) => <TabNavigator {...props} carrito={carrito} setCarrito={setCarrito} />}
                </Stack.Screen>
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                <Stack.Screen name="VenderProducto" component={VenderProductoScreen} />
                    <Stack.Screen 
                      name="CategoriaProductos" 
                      component={CategoriaProductosScreen}
                      options={{ headerShown: true }}
                    />
              </Stack.Navigator>
            </NavigationContainer>
          </AuthProvider>
        </ProductosContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    console.log('¡Se necesitan permisos para las notificaciones!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;