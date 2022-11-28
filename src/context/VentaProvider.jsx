import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';

const VentaContext = createContext()

import useProductos from "../hooks/useProductos";

const VentaProvider = ({ children }) => {

    const {productos, setProductos, obtenerProducto} = useProductos();
    const [ventas, setVentas] = useState([])
    const [articulosCarritos, setarticulosCarritos] = useState([])
    // JSON.parse(localStorage.getItem('venta')) ?? []
    const [ventaState, setVentaState] = useState({})

    const [existe, setExiste] = useState(false)
    const [precioTotal, setPrecioTotal] = useState(0)

    useEffect(() => {
        const obtenerVentas = async () =>{
            try {
               const { data } = await clienteAxios('/ventas/get');
               setVentas(data);
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
        

        // if (!productoFiltrado) {
        //     return console.log('Producto no encontrado')
        // }
        const infArticulo = {
            _id: productoFiltrado._id,
            nombre: productoFiltrado.nombre,
            description: productoFiltrado.description,
            precio: productoFiltrado.precio,
            url: productoFiltrado.image.url,
            cantidad: 1
        }
        
        setVentaState(infArticulo)
        // Revisa si un elemento ya existe en el carrito
        let exist
        articulosCarritos.find(item => ventaState._id === item._id ? exist = true : exist=false)

        if(exist){
            //Actualizamos la cantidad

            console.log("Si existe");
            const curso = articulosCarritos.map( curso => {
                if(curso._id === infArticulo._id){
                    curso.cantidad++; // Retorna el objeto actualizado
                }
                return curso
            } );
            setarticulosCarritos([...curso]);
        }else{
            //Agregar elemento al arreglo del carrito de compra 
            //utilizando Spread Operator
            setarticulosCarritos([...articulosCarritos, infArticulo])    
        }

        console.log(articulosCarritos);
       
    }

    return (
        <VentaContext.Provider
            value={{
                añadirProducto,
                articulosCarritos, 
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