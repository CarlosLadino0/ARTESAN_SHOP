import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/Auth";
import { useNavigation } from "@react-navigation/native";

const PerfilScreen = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigation = useNavigation();

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
          <Text style={styles.titulo}>Bienvenido</Text>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate("Auth", { screen: "Login" })}
          >
            <Text style={styles.textoBoton}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonSecundario}
            onPress={() => navigation.navigate("Auth", { screen: "Registro" })}
          >
            <Text style={styles.textoBotonSecundario}>Registrarse</Text>
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
  botonSecundario: {
    borderWidth: 2,
    borderColor: "#8e44ad",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  textoBotonSecundario: {
    color: "#8e44ad",
    fontWeight: "600",
    fontSize: 16,
  },
});
