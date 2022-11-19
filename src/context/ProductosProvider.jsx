import { useState, useEffect, createContext } from "react";
import clienteAxios from '../config/axios';

const ProductosContext = createContext()

const ProductosProvider = ({ children }) => {

    const [productos, setProductos] = useState([])
    const [productoState, setProductoState] = useState({})

    useEffect(() => {
        const obtenerProductos = async () =>{
            try {
      
                const { data } = await clienteAxios('/productos/get');
                setProductos(data);
        
            } catch (error) {
                console.log("Error: " + error.message);
            }
          };
          obtenerProductos();   
    }, [productos])

    const submitProducto = producto => {
        setProductos([...productos, producto])
        localStorage.setItem('productos', JSON.stringify(productos))
    };

    const obtenerProducto = async (id) =>{
        try {

            const { data } = await clienteAxios(`/productos/get/${id}`);  
            setProductoState(data);
          } catch (error) {
              console.log("Error: " + error.message);
          }
    };

    return (
        <ProductosContext.Provider
            value={{
                submitProducto,
                productos,
                productoState,
                obtenerProducto
            }}
        >
            {children}
        </ProductosContext.Provider>
    )
}

export { ProductosProvider }

export default ProductosContext