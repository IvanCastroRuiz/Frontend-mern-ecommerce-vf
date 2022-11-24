import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';

const VentaContext = createContext()

import useProductos from "../hooks/useProductos";

const VentaProvider = ({ children }) => {

    const [productos, setProductos] = useState(JSON.parse(localStorage.getItem('productos')) ?? []);
    //const [productos, setProductos] = useProductos();

    const [ventas, setVentas] = useState([])
    // JSON.parse(localStorage.getItem('venta')) ?? []
    const [ventaState, setVentaState] = useState({})

    const [existe, setExiste] = useState(false)
    const [precioTotal, setPrecioTotal] = useState(0)

    useEffect(() => {
        const obtenerVentas = async () =>{
            try {
               const { data } = await clienteAxios('/ventas/get');
               setVentas(data);
               console.log(data);
            } catch (error) {
                console.log("Error: " + error.message);
            }
        };
          obtenerVentas();   
    }, [ventas])

    const añadirProducto = _id => {

        //Buscar producto existente
        //const productoFiltrado = productos.find(producto => producto._id == _id);
        //console.log(productoFiltrado);
        //console.log(productos);

        /*setPrecioTotal(Number(productoFiltrado.precio) + Number(precioTotal))
        

        if (!productoFiltrado) {
            return console.log('Producto no encontrado')
        }
        const objetoVenta = {
            id: productoFiltrado.id,
            nombre: productoFiltrado.nombre,
            descripcion: productoFiltrado.descripcion,
            precio: productoFiltrado.precio,
            cantidad: 1
        }

        setVentaState(objetoVenta)
        venta.find(item => ventaState.id === item.id ? setExiste(true) : setVenta(false))
        
        setVenta([...venta, ventaState])*/
        
    }

    return (
        <VentaContext.Provider
            value={{
                añadirProducto,
                ventas, 
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