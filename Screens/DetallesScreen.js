import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, Pressable, StyleSheet } from "react-native";
import styles from "../styles/detallesStyles";
import BackButton from "../components/BackButton";

const DetallesScreen = ({ route, navigation, carrito, setCarrito }) => {
  const { producto } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const agregarAlCarrito = () => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    alert("Producto agregado al carrito");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={styles.encabezado}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={styles.titulo}>Detalles del Producto</Text>
            <View style={{ width: 40 }} />
          </View>

          <Pressable onPress={() => setModalVisible(true)}>
            <Image source={{ uri: producto.imagen }} style={styles.imagen} />
          </Pressable>

          <Text style={styles.nombre}>{producto.nombre}</Text>
          <Text style={styles.precio}>${producto.precio}</Text>
          <Text style={styles.categoria}>{producto.categoria}</Text>
          <Text style={styles.descripcion}>{producto.descripcion}</Text>

          <TouchableOpacity style={styles.botonComprar} onPress={agregarAlCarrito}>
            <Text style={styles.textoBoton}>Agregar al Carrito</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={modalStyles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Image source={{ uri: producto.imagen }} style={modalStyles.modalImage} resizeMode="contain" />
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
  },
  modalImage: {
    maxWidth: '95%', 
    maxHeight: '80%', 
    resizeMode: 'contain',
  },
});

export default DetallesScreen;
