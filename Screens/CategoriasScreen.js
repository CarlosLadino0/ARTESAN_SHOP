import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CategoriasScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pantalla de Categorías</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  texto: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CategoriasScreen;