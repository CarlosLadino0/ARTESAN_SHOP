import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { BACKEND_URL } from "../config";

const iconosCategorias = {
  "Cerámica": "color-palette",
  "Textiles": "shirt",
  "Joyería": "diamond",
  "Madera": "leaf",
  "Cuero": "git-branch",
  "Pintura": "brush",
  "Otros": "apps",
};

const coloresCategorias = {
  "Cerámica": "#8e44ad",
  "Textiles": "#e74c3c",
  "Joyería": "#f1c40f",
  "Madera": "#27ae60",
  "Cuero": "#d35400",
  "Pintura": "#3498db",
  "Otros": "#7f8c8d",
};

const CategoriasScreen = ({ navigation }) => {
  const [categorias, setCategorias] = useState([]);
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/productos.json`);
      const productos = response.data;
      
      const categoriasUnicas = {};
      Object.values(productos).forEach(producto => {
        if (producto.categoria) {
          if (!categoriasUnicas[producto.categoria]) {
            categoriasUnicas[producto.categoria] = {
              nombre: producto.categoria,
              count: 1,
              imagen: producto.imagen
            };
          } else {
            categoriasUnicas[producto.categoria].count++;
          }
        }
      });

      const categoriasArray = Object.values(categoriasUnicas)
        .sort((a, b) => b.count - a.count);

      const productosArray = Object.entries(productos).map(([id, producto]) => ({
        id,
        ...producto
      }));
      
      const productosRandom = productosArray
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setCategorias(categoriasArray);
      setProductosDestacados(productosRandom);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setError("No se pudieron cargar los datos");
      setLoading(false);
    }
  };

  const handleCategoriaPress = (categoria) => {
    navigation.navigate('CategoriaProductos', {
      categoria: categoria.nombre
    });
  };

  const handleProductoPress = (producto) => {
    navigation.navigate('Home', {
      screen: 'Detalles',
      params: { producto }
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8e44ad" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#e74c3c" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={cargarDatos}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Categorías</Text>
      </View>
      
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.gridContainer}>
          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.nombre}
              style={styles.categoriaCard}
              onPress={() => handleCategoriaPress(categoria)}
            >
              <View style={[
                styles.iconContainer, 
                { backgroundColor: (coloresCategorias[categoria.nombre] || coloresCategorias["Otros"]) + '20' }
              ]}>
                <Ionicons 
                  name={iconosCategorias[categoria.nombre] || iconosCategorias["Otros"]} 
                  size={32} 
                  color={coloresCategorias[categoria.nombre] || coloresCategorias["Otros"]} 
                />
              </View>
              <Text style={styles.categoriaNombre}>{categoria.nombre}</Text>
              <Text style={styles.productoCount}>{categoria.count} productos</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Productos Destacados</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            {productosDestacados.map((producto) => (
              <TouchableOpacity
                key={producto.id}
                style={styles.featuredCard}
                onPress={() => handleProductoPress(producto)}
              >
                <Image
                  source={{ uri: producto.imagen }}
                  style={styles.featuredImage}
                />
                <View style={styles.featuredOverlay}>
                  <Text style={styles.featuredTitle}>{producto.nombre}</Text>
                  <Text style={styles.featuredPrice}>${producto.precio}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  categoriaCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoriaNombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  productoCount: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  featuredSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  featuredScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  featuredCard: {
    width: 280,
    height: 180,
    marginRight: 16,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  featuredOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 16,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  featuredPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#8e44ad",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CategoriasScreen;