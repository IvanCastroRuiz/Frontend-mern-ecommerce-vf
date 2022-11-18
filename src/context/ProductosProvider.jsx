import { useState, useEffect, createContext } from "react";

const ProductosContext = createContext()

const ProductosProvider = ({ children }) => {

    const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('productos')) ?? [])
    const [productoState, setProductoState] = useState({})

    useEffect(() => localStorage.setItem('productos', JSON.stringify(productos)), [productos])

    const submitProducto = producto => {
        setProductos([...productos, producto])
        localStorage.setItem('productos', JSON.stringify(productos))
    }

    const obtenerProducto = id => {
        const productoFiltrado = productos.filter(producto => producto.id === id)
        setProductoState(productoFiltrado[0])
    }

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