import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/Auth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    } else {
      navigation.navigate("Main");
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
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
