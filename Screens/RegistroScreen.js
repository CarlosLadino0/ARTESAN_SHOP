import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Platform, KeyboardAvoidingView, ScrollView, Alert, Keyboard, Pressable } from "react-native";
import axios from "axios";
import { API_KEY } from "../config";
import BackButton from "../components/BackButton";

const RegistroScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    Keyboard.dismiss();
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    try {
      setCargando(true);
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      Alert.alert("Éxito", "Registro exitoso");
      navigation.navigate("Auth", { screen: "Login" });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Error al registrar usuario");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Pressable 
      style={styles.container} 
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.encabezado}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={styles.titulo}>Crear Cuenta</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="next"
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleRegistro}
            />

            {cargando ? (
              <ActivityIndicator size="small" color="#8e44ad" style={{ marginTop: 20 }} />
            ) : (
              <TouchableOpacity 
                style={styles.boton} 
                onPress={handleRegistro}
                activeOpacity={0.7}
              >
                <Text style={styles.textoBoton}>Registrarse</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.botonSecundario}
              onPress={() => navigation.navigate("Auth", { screen: "Login" })}
            >
              <Text style={styles.textoBotonSecundario}>
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: Platform.OS === "ios" ? 40 : 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#8e44ad",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonSecundario: {
    marginTop: 20,
    alignItems: "center",
  },
  textoBotonSecundario: {
    color: "#8e44ad",
    fontSize: 16,
  },
});

export default RegistroScreen;
