import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { BACKEND_URL } from "../config";

const VenderProductoScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [precio, setPrecio] = useState("");
  const [cargando, setCargando] = useState(false);

  const handlePublicar = async () => {
    if (!nombre || !categoria || !imagen || !precio) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const nuevoProducto = {
      nombre,
      categoria,
      imagen,
      precio: Number(precio),
    };

    try {
      setCargando(true);

      await axios.post(`${BACKEND_URL}/productos.json`, nuevoProducto);

      Alert.alert("Éxito", "Producto publicado correctamente");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo publicar el producto");
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Publicar Producto</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoría"
          value={categoria}
          onChangeText={setCategoria}
        />
        <TextInput
          style={styles.input}
          placeholder="URL de la imagen"
          value={imagen}
          onChangeText={setImagen}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />

        {cargando ? (
          <ActivityIndicator size="large" color="#27ae60" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity style={styles.boton} onPress={handlePublicar}>
            <Text style={styles.textoBoton}>Publicar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VenderProductoScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  boton: {
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
