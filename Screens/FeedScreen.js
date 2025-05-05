import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import ProductoCard from "../components/ProductoCard";
import { ProductosContext } from "../context/ProductosContext";
import styles from "../styles/feedStyles";


const FeedScreen = ({ navigation, carrito, setCarrito }) => {
  const { productos, isLoading } = useContext(ProductosContext);

  const cantidadTotalEnCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>Tienda de Artesanías</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Carrito")} style={styles.botonCarrito}>
            <Text style={styles.textoCarrito}>🛒 ({cantidadTotalEnCarrito})</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#8e44ad" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={productos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductoCard producto={item} carrito={carrito} setCarrito={setCarrito} navigation={navigation} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;
