import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8e44ad",
  },
  botonCarrito: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  textoCarrito: {
    fontSize: 18,
  },
  imagen: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 15,
    borderRadius: 12,
  },
  nombre: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  precio: {
    fontSize: 20,
    color: "#8e44ad",
    marginBottom: 8,
    fontWeight: "600",
  },
  categoria: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: "#444",
  },
  botonComprar: {
    backgroundColor: "#8e44ad",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textoBoton: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  botonVolver: {
    marginTop: 15,
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textoBotonVolver: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  cardProducto: {
    backgroundColor: "#fff",
    borderRadius: 12,
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
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  infoProducto: {
    flex: 1,
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  precioProducto: {
    fontSize: 16,
    color: "#8e44ad",
    marginBottom: 5,
    fontWeight: "600",
  },
  totalProducto: {
    fontSize: 14,
    color: "#666",
  },
  botonesCantidad: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  botonCantidad: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  botonEliminar: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textoBotonCantidad: {
    fontSize: 18,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  totalContainer: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    marginTop: 10,
  },
});

export default styles;
