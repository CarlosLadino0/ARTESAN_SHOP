import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  contenedorImagen: {
    width: "100%",
    height: 150, 
    borderRadius: 10,
    overflow: "hidden", 
  },
  imagen: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", 
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  precio: {
    fontSize: 14,
    color: "#888",
    marginVertical: 5,
  },
  botonComprar: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
