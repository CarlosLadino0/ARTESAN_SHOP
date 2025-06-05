import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  contenedorImagen: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  imagen: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  precio: {
    fontSize: 16,
    color: "#8e44ad",
    marginBottom: 12,
    fontWeight: "600",
  },
  botonComprar: {
    backgroundColor: "#8e44ad",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
