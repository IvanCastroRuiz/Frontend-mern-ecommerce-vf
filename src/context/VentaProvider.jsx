import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';

const VentaContext = createContext()

import useProductos from "../hooks/useProductos";

const VentaProvider = ({ children }) => {

    //const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('productos')) ?? []);
    const {productos, setProductos, obtenerProducto} = useProductos();
    const [ventas, setVentas] = useState([])
    const [ventasProductos, setVentasProductos] = useState([])
    // JSON.parse(localStorage.getItem('venta')) ?? []
    const [ventaState, setVentaState] = useState({})

    const [existe, setExiste] = useState(false)
    const [precioTotal, setPrecioTotal] = useState(0)

    useEffect(() => {
        const obtenerVentas = async () =>{
            try {
               const { data } = await clienteAxios('/ventas/get');
               setVentas(data);
            //    console.log(data);
            } catch (error) {
                console.log("Error: " + error.message);
            }
        };
          obtenerVentas();   
    }, [ventas])

    const añadirProducto = _id => {
        
        //Buscar producto existente
        const productoFiltrado = productos.find(producto => producto._id == _id);
        
        setPrecioTotal(Number(productoFiltrado.precio) + Number(precioTotal))
        

        if (!productoFiltrado) {
            return console.log('Producto no encontrado')
        }
        const objetoVenta = {
            id: productoFiltrado._id,
            nombre: productoFiltrado.nombre,
            description: productoFiltrado.description,
            precio: productoFiltrado.precio,
            cantidad: 1
        }

        setVentaState(objetoVenta)
        console.log(ventaState);
        ventasProductos.find(item => ventaState._id === item._id ? setExiste(true) : setVentas(false))
        
        setVentasProductos([...ventasProductos, ventaState])
        console.log(ventasProductos);
    }

    return (
        <VentaContext.Provider
            value={{
                añadirProducto,
                ventasProductos, 
                precioTotal
            }}>

            {children}
        </VentaContext.Provider>
    )
}

export {
    VentaProvider
}

export default VentaContext