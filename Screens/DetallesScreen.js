import React from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styles/detallesStyles";

const DetallesScreen = ({ route, navigation, carrito, setCarrito }) => {
  const { producto } = route.params;

  const agregarAlCarrito = () => {
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      const carritoActualizado = carrito.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(carritoActualizado);
    } else {
      setCarrito([
        ...(carrito || []),
        { ...producto, cantidad: 1, precio: Number(producto.precio) },
      ]);
    }

    alert("Producto agregado al carrito");
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 12 }}>
      <View style={styles.container}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>{producto.nombre}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Carrito")} style={styles.botonCarrito}>
            <Text style={styles.textoCarrito}>🛒 ({carrito.length})</Text>
          </TouchableOpacity>
        </View>

        <Image source={{ uri: producto.imagen }} style={styles.imagen} />

        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>${producto.precio}</Text>
        <Text style={styles.categoria}>{producto.categoria}</Text>
        <Text style={styles.descripcion}>{producto.descripcion}</Text>

        <TouchableOpacity style={styles.botonComprar} onPress={agregarAlCarrito}>
          <Text style={styles.textoBoton}>Agregar al Carrito</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotonVolver}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetallesScreen;
