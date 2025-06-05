import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "../styles/productoCardStyles";

const ProductoCard = ({ producto, carrito, setCarrito, navigation }) => {
  
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
  
    Alert.alert("Éxito", "Producto agregado al carrito");
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detalles", { producto })}>
      <View style={styles.card}>
        <View style={styles.contenedorImagen}>
          <Image source={{ uri: producto.imagen }} style={styles.imagen} />
        </View>

        <Text style={styles.nombre}>{producto.nombre}</Text>
        <Text style={styles.precio}>${producto.precio}</Text>

        <TouchableOpacity style={styles.botonComprar} onPress={agregarAlCarrito}>
          <Text style={styles.textoBoton}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductoCard;
