import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const ProductosContext = createContext({
  productos: [],
  isLoading: true,
  fetchProductos: () => {},
});

const ProductosContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductos = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BACKEND_URL}/productos.json`);
      const lista = [];

      for (const key in response.data) {
        const producto = response.data[key];
        lista.push({
          id: key,
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio,
          imagen: producto.imagen,
        });
      }

      setProductos(lista);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  return (
    <ProductosContext.Provider value={{ productos, isLoading, fetchProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};

export default ProductosContextProvider;
