import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export const ProductosContext = createContext({
    productos: [],
    isLoading: true
});

const ProductosContextProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
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
        };

        fetchProductos();
    }, []);

    return (
        <ProductosContext.Provider value={{ productos, isLoading }}>
            {children}
        </ProductosContext.Provider>
    );
};

export default ProductosContextProvider;
