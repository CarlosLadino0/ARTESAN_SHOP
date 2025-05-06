import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "../config";
import { AuthContext } from "../context/Auth";

const RegistroScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistro = async () => {
    if (!nombre || !apellido || !email || !celular || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
          {
            email,
            password,
            returnSecureToken: true,
          }
        );
      
        Alert.alert("Éxito", "Usuario registrado con éxito");

        await login(email, password);
        navigation.navigate("Main");
      } catch (error) {
        const errorCode = error.response?.data?.error?.message;
      
        let mensaje;
        switch (errorCode) {
          case "EMAIL_EXISTS":
            mensaje = "Este correo ya está registrado.";
            break;
          case "INVALID_EMAIL":
            mensaje = "El correo electrónico no es válido.";
            break;
          case "WEAK_PASSWORD":
            mensaje = "La contraseña debe tener al menos 6 caracteres.";
            break;
          default:
            mensaje = "Ocurrió un error. Intenta nuevamente.";
        }
      
        Alert.alert("Error", mensaje);
      }
      
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 12 }}>
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro de Usuario</Text>

            <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
            <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
            <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Celular" value={celular} onChangeText={setCelular} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity style={styles.boton} onPress={handleRegistro}>
                <Text style={styles.textoBoton}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default RegistroScreen;

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
