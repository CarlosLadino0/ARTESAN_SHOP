import React, { useContext, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import ProductoCard from "../components/ProductoCard";
import { ProductosContext } from "../context/ProductosContext";
import { AuthContext } from "../context/Auth";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../styles/feedStyles";

const FeedScreen = ({ navigation, carrito, setCarrito }) => {
  const { productos, isLoading, fetchProductos } = useContext(ProductosContext);
  const { usuario } = useContext(AuthContext);

  const cantidadTotalEnCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Recargar productos al volver a esta pantalla
  useFocusEffect(
    useCallback(() => {
      fetchProductos();
    }, [fetchProductos])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Tienda de Artesanías</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {usuario && (
              <TouchableOpacity
                style={styles.botonVender}
                onPress={() => navigation.navigate("VenderProducto")}
              >
                <Text style={styles.textoVender}>Vender</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate("Carrito")}
              style={styles.botonCarrito}
            >
              <Text style={styles.textoCarrito}>🛒 ({cantidadTotalEnCarrito})</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#8e44ad" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={productos}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <ProductoCard
                producto={item}
                carrito={carrito}
                setCarrito={setCarrito}
                navigation={navigation}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;
