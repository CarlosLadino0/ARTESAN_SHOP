import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Keyboard, Platform, KeyboardAvoidingView, ScrollView, Pressable } from "react-native";
import { AuthContext } from "../context/Auth";
import BackButton from "../components/BackButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setCargando(true);
    const exito = await login(email, password);
    setCargando(false);

    if (exito) {
      Alert.alert(
        "¡Bienvenido!",
        "Has iniciado sesión correctamente",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("MainTabs")
          }
        ]
      );
    } else {
      Alert.alert("Error", "Credenciales inválidas");
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
            <Text style={styles.titulo}>Iniciar Sesión</Text>
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
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            {cargando ? (
              <ActivityIndicator size="small" color="#8e44ad" style={{ marginTop: 20 }} />
            ) : (
              <TouchableOpacity 
                style={styles.boton} 
                onPress={handleLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.textoBoton}>Iniciar Sesión</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.botonSecundario}
              onPress={() => navigation.navigate("Auth", { screen: "Registro" })}
            >
              <Text style={styles.textoBotonSecundario}>
                ¿No tienes cuenta? Regístrate
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

export default LoginScreen;
