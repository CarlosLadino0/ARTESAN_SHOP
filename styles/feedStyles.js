import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10 
  },

  encabezado: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", 
    padding: 10 
  },

  titulo: { 
    fontSize: 20,
    fontWeight: "bold" 
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 12
  },
  
  botonCarrito: { 
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5 
  },

  textoCarrito: { 
    fontSize: 16 
  },
});