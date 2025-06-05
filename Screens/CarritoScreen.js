import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native";
import styles from "../styles/detallesStyles";
import BackButton from "../components/BackButton";
import { AuthContext } from "../context/Auth";

const CarritoScreen = ({ navigation, carrito, setCarrito }) => {
  const { usuario } = useContext(AuthContext);
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const aumentarCantidad = (productoId) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item.id === productoId) {
        return { ...item, cantidad: item.cantidad + 1 };
      }
      return item;
    });
    setCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (productoId) => {
    const nuevoCarrito = carrito
      .map((item) => {
        if (item.id === productoId && item.cantidad > 1) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      })
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevoCarrito);
  };

  const eliminarProducto = (productoId) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const pagar = () => {
    if (!usuario) {
      Alert.alert(
        "Sesión requerida",
        "Debes iniciar sesión para realizar una compra",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Iniciar Sesión",
            onPress: () => navigation.navigate("Auth", { screen: "Login" })
          }
        ]
      );
      return;
    }

    Alert.alert(
      "¡Gracias por tu compra! 🎉",
      "Tu pedido ha sido procesado correctamente",
      [
        {
          text: "OK",
          onPress: () => {
            setCarrito([]);
            navigation.navigate("MainTabs", {
              screen: "Home",
              params: {
                screen: "HomeFeed"
              }
            });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.encabezado}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={styles.titulo}>Carrito de Compras</Text>
          <View style={{ width: 40 }} />
        </View>

        {carrito.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.descripcion, { textAlign: "center", fontSize: 18 }]}>
              Tu carrito está vacío 🛍️
            </Text>
            <TouchableOpacity
              style={[styles.botonComprar, { marginTop: 20 }]}
              onPress={() => {
                navigation.navigate("MainTabs", {
                  screen: "Home",
                  params: {
                    screen: "HomeFeed"
                  }
                });
              }}
            >
              <Text style={styles.textoBoton}>Explorar Productos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <FlatList
              data={carrito}
              keyExtractor={(item, index) => item.id.toString() + "-" + index}
              contentContainerStyle={{ paddingBottom: 24 }}
              renderItem={({ item }) => (
                <View style={styles.cardProducto}>
                  <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                    <Image
                      source={{ uri: item.imagen }}
                      style={{ width: 60, height: 60, borderRadius: 8 }}
                    />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={styles.nombreProducto}>{item.nombre}</Text>
                      <Text style={styles.precioProducto}>
                        ${item.precio.toFixed(2)}
                      </Text>
                      <Text style={styles.totalProducto}>
                        Total: ${(item.cantidad * item.precio).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.botonesCantidad}>
                    <TouchableOpacity
                      onPress={() => disminuirCantidad(item.id)}
                      style={styles.botonCantidad}
                    >
                      <Text style={styles.textoBotonCantidad}>➖</Text>
                    </TouchableOpacity>

                    <Text style={{ marginHorizontal: 10, fontSize: 16, fontWeight: "500" }}>
                      {item.cantidad}
                    </Text>

                    <TouchableOpacity
                      onPress={() => aumentarCantidad(item.id)}
                      style={styles.botonCantidad}
                    >
                      <Text style={styles.textoBotonCantidad}>➕</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => eliminarProducto(item.id)}
                      style={styles.botonEliminar}
                    >
                      <Text style={[styles.textoBotonCantidad, { color: "#fff" }]}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <View style={styles.totalContainer}>
              <Text style={[styles.precio, { fontSize: 22, textAlign: "center" }]}>
                Total: ${total.toFixed(2)}
              </Text>
              <TouchableOpacity style={styles.botonComprar} onPress={pagar}>
                <Text style={styles.textoBoton}>Proceder al Pago</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CarritoScreen;
