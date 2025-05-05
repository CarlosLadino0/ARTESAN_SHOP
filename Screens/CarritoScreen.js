import React from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import styles from "../styles/detallesStyles";

const CarritoScreen = ({ navigation, carrito, setCarrito }) => {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const aumentarCantidad = (productoId) => {
    const nuevoCarrito = carrito.map(item => {
      if (item.id === productoId) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (productoId) => {
    const nuevoCarrito = carrito.map(item => {
      if (item.id === productoId && item.cantidad > 1) {
        return { ...item, cantidad: item.cantidad - 1 };
      }
      return item;
    }).filter(item => item.cantidad > 0); 
    setCarrito(nuevoCarrito);
  };

  const eliminarProducto = (productoId) => {
    const nuevoCarrito = carrito.filter(item => item.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const pagar = () => {
    alert("Gracias por su compra");
    setCarrito([]);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 12 }}>
    <View style={styles.container}>
      <View style={styles.encabezado}>
        <Text style={styles.titulo}>Carrito de Compras</Text>
      </View>

      {carrito.length === 0 ? (
        <Text style={styles.descripcion}>Tu carrito está vacío 🛍️</Text>
      ) : (
        <>
          <FlatList
            data={carrito}
            keyExtractor={(item, index) => item.id.toString() + "-" + index}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10, borderBottomWidth: 1, borderColor: "#ccc", paddingBottom: 10 }}>
                <Text style={styles.producto}>
                  {item.nombre}
                </Text>
                <Text style={styles.precio}>
                  {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                  <TouchableOpacity onPress={() => disminuirCantidad(item.id)} style={styles.botonCarrito}>
                    <Text style={styles.textoCarrito}>➖</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => aumentarCantidad(item.id)} style={[styles.botonCarrito, { marginLeft: 5 }]}>
                    <Text style={styles.textoCarrito}>➕</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => eliminarProducto(item.id)} style={[styles.botonCarrito, { marginLeft: 10, backgroundColor: "#ff4d4d" }]}>
                    <Text style={[styles.textoCarrito, { color: "#fff" }]}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <Text style={styles.precio}>Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.botonComprar} onPress={pagar}>
            <Text style={styles.textoBoton}>Pagar</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotonVolver}>Volver</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default CarritoScreen;