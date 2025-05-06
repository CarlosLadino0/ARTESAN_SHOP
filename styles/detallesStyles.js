import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  botonCarrito: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  textoCarrito: {
    fontSize: 16,
  },
  imagen: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 10,
  },
  nombre: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  precio: {
    fontSize: 18,
    color: "green",
    marginBottom: 5,
  },
  categoria: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 20,
  },
  botonComprar: {
    backgroundColor: "#8e44ad",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botonVolver: {
    marginTop: 10,
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBotonVolver: {
    fontSize: 16,
  },
  cardProducto: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoProducto: {
    flex: 1,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  precioProducto: {
    fontSize: 16,
    color: "green",
    marginBottom: 5,
  },
  totalProducto: {
    fontSize: 14,
    color: "gray",
  },
  botonesCantidad: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  botonCantidad: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  botonEliminar: {
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  textoBotonCantidad: {
    fontSize: 18,
  },
});

export default styles;
