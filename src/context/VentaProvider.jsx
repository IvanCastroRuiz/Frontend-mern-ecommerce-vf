import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const VentaContext = createContext()

import useProductos from "../hooks/useProductos";
import useAuth from '../hooks/useAuth'

const VentaProvider = ({ children }) => {

    const { auth } = useAuth();
    const {productos} = useProductos();
    const [ventas, setVentas] = useState([])
    const [articulosCarritos, setArticulosCarritos] = useState([])
    const [ventaState, setVentaState] = useState({})
    const [precioTotal, setPrecioTotal] = useState(0)

    const{ usuario } = auth;

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

    const añadirProducto = (_id) => {
        
        //Buscar producto existente
        const productoFiltrado = productos.find(producto => producto._id == _id);
        // Actualiza el objeto
        const infArticulo = {
            inf: productoFiltrado,
            cantidad: 1,
            subtotal: productoFiltrado.precio
        }

        setVentaState(infArticulo)
        // console.log(infArticulo);
        // Revisa si un elemento ya existe en el carrito
        let exist
        articulosCarritos.find(item => infArticulo.inf._id === item.inf._id ? exist = true : exist=false)
        if(exist){
            //Actualizamos la cantidad
            const articulo = articulosCarritos.map( articulo => {
                if(articulo.inf._id === infArticulo.inf._id){
                    articulo.cantidad++; // Retorna el objeto actualizado
                    articulo.subtotal = articulo.cantidad * articulo.inf.precio
                }
                return articulo
            } );
            setArticulosCarritos([...articulo]);
            setPrecioTotal(Number(productoFiltrado.precio) + Number(precioTotal))
        }else{
            //Agregar elemento al arreglo del carrito de compra 
            //utilizando Spread Operator
            setArticulosCarritos([...articulosCarritos, infArticulo])    
            setPrecioTotal(Number(productoFiltrado.precio) + Number(precioTotal))
        }
    };

    const eliminarProducto = (_id, subtotal) =>{
        setArticulosCarritos(articulosCarritos.filter( articulo => articulo.inf._id !== _id ));
        setPrecioTotal(precioTotal - subtotal);
    };

    const registrarVenta = async () =>{  

        if(precioTotal === 0){
            Swal.fire('No tiene articulos en su carrito');
            return;
        };
        // Lleno el objeto
        const venta = {
            cliente: usuario._id,
            articulos: articulosCarritos,
            total:precioTotal
        };
        try {
      
            const { data } = await clienteAxios.post('/ventas/create', venta);
            setVentas([...ventas, data]);
     
            setVentaState({});
            setPrecioTotal(0);
            setArticulosCarritos([]);

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Venta registrada con exito id - ${data._id}`,
                showConfirmButton: false,
                timer: 1500
              })

        } catch (error) {
            console.log("Error: " + error.message);
        }
    };

    const cancelarVenta = async (_id) => {
        try {
      
            const { data } = await clienteAxios.put(`/ventas/update/${_id}`);
            //console.log(data);
            Swal.fire(`${data.msg}`);

        } catch (error) {
            console.log("Error: " + error.message);
        }
    };

    return (
        <VentaContext.Provider
            value={{
                articulosCarritos, 
                precioTotal,
                ventas,
                setArticulosCarritos,
                setPrecioTotal,
                eliminarProducto,
                registrarVenta,
                cancelarVenta,
                añadirProducto,
            }}>

            {children}
        </VentaContext.Provider>
    )
}

export {
    VentaProvider
}

export default VentaContext