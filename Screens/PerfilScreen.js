import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/Auth";
import { useNavigation } from "@react-navigation/native";

const PerfilScreen = () => {
  const { usuario, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Por favor completa todos los campos");
    }

    const success = await login(email, password);
    if (!success) {
      Alert.alert("Error", "Credenciales incorrectas");
    } else {
      navigation.navigate("Feed");
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      {usuario ? (
        <>
          <Text style={styles.bienvenida}>¡Hola, {usuario.email}!</Text>
          <TouchableOpacity style={styles.boton} onPress={handleLogout}>
            <Text style={styles.textoBoton}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.titulo}>Iniciar Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.boton} onPress={handleLogin}>
            <Text style={styles.textoBoton}>Ingresar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PerfilScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  bienvenida: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4a148c",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
