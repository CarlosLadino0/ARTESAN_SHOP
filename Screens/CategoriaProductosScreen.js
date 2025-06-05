import React, { useContext, useCallback, useLayoutEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import ProductoCard from "../components/ProductoCard";
import { ProductosContext } from "../context/ProductosContext";
import { AuthContext } from "../context/Auth";
import { useFocusEffect, useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const CategoriaProductosScreen = ({ route }) => {
  const { productos, isLoading, fetchProductos } = useContext(ProductosContext);
  const { usuario } = useContext(AuthContext);
  const navigation = useNavigation();
  const { categoria: categoriaSeleccionada } = route.params;

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter(producto => producto.categoria === categoriaSeleccionada)
    : productos; // En teoría, siempre habrá una categoría aquí

  useFocusEffect(
    useCallback(() => {
      fetchProductos();
    }, [fetchProductos])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoriaSeleccionada || 'Productos',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('MainTabs', { screen: 'Categorías' })}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      ),
      headerShown: true, 
      headerTitleAlign: 'center',
      headerTintColor: '#333',
      headerStyle: {
        backgroundColor: '#fff',
      },
    });
  }, [navigation, categoriaSeleccionada]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#8e44ad" style={{ marginTop: 20 }} />
        ) : productosFiltrados.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {`No hay productos en la categoría ${categoriaSeleccionada}`}
            </Text>
          </View>
        ) : (
          <FlatList
            data={productosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <ProductoCard
                producto={item}
                carrito={[]}
                setCarrito={() => {}} 
                navigation={navigation}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: 'center',
  },
});

export default CategoriaProductosScreen; 
