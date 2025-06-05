import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Image, Modal } from "react-native";
import axios from "axios";
import { BACKEND_URL } from "../config";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from 'expo-notifications';
import BackButton from "../components/BackButton";
import { Ionicons } from '@expo/vector-icons';

const VenderProductoScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState(null);
  const [precio, setPrecio] = useState("");
  const [cargando, setCargando] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [accionPendiente, setAccionPendiente] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
        Alert.alert('Se necesitan permisos', 'Por favor, concede los permisos necesarios para usar la cámara y la galería.');
      }
    })();
  }, []);

  const tomarFoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImagen(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al abrir la cámara:", error);
      Alert.alert("Error", "No se pudo abrir la cámara.");
    }
  };

  const elegirDeGaleria = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImagen(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al abrir la galería:", error);
      Alert.alert("Error", "No se pudo abrir la galería.");
    }
  };

  useEffect(() => {
    if (!modalVisible && accionPendiente) {
      if (accionPendiente === "foto") {
        tomarFoto();
      } else if (accionPendiente === "galeria") {
        elegirDeGaleria();
      }
      setAccionPendiente(null);
    }
  }, [modalVisible, accionPendiente]);

  const seleccionarImagen = () => {
    setModalVisible(true);
  };

  const handlePublicar = async () => {
    if (!nombre || !categoria || !imagen || !precio || !descripcion) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const nuevoProducto = {
      nombre,
      categoria,
      imagen,
      precio: Number(precio),
      descripcion,
    };

    try {
      setCargando(true);

      await axios.post(`${BACKEND_URL}/productos.json`, nuevoProducto);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Producto publicado! 🎉",
          body: `Tu producto "${nombre}" ha sido publicado exitosamente`,
          data: { producto: nuevoProducto },
        },
        trigger: null, 
      });

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
        <View style={styles.encabezado}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.titulo}>Publicar Producto</Text>
          <View style={{ width: 40 }} />
        </View>

        <TouchableOpacity
          style={[styles.botonComprar, { marginBottom: 20 }]}
          onPress={seleccionarImagen}
        >
          <Text style={styles.textoBoton}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        {imagen && (
          <Image
            source={{ uri: imagen }}
            style={[styles.imagen, { marginBottom: 20 }]}
          />
        )}

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar imagen</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisible(false); setAccionPendiente("foto"); }}>
                <Ionicons name="camera" size={28} color="#8e44ad" style={{ marginRight: 10 }} />
                <Text style={styles.modalButtonText}>Tomar foto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => { setModalVisible(false); setAccionPendiente("galeria"); }}>
                <Ionicons name="image" size={28} color="#8e44ad" style={{ marginRight: 10 }} />
                <Text style={styles.modalButtonText}>Elegir de galería</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { justifyContent: 'center' }]} onPress={() => setModalVisible(false)}>
                <Text style={[styles.modalButtonText, { color: '#888' }]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
        />

        {cargando ? (
          <ActivityIndicator size="small" color="#8e44ad" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity style={styles.boton} onPress={handlePublicar}>
            <Text style={styles.textoBoton}>Publicar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12
  },
  container: {
    padding: 24,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
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
  botonComprar: {
    backgroundColor: "#8e44ad",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  imagen: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#333",
  },
});

export default VenderProductoScreen;
