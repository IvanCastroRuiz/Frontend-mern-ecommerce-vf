import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios';

const VentaContext = createContext()

import useProductos from "../hooks/useProductos";

const VentaProvider = ({ children }) => {

    const {productos, setProductos, obtenerProducto} = useProductos();
    const [ventas, setVentas] = useState([])
    const [articulosCarritos, setArticulosCarritos] = useState([])
    // JSON.parse(localStorage.getItem('venta')) ?? []
    const [ventaState, setVentaState] = useState({})

    // const [existe, setExiste] = useState(false)
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

    const añadirProducto = (_id) => {
        
        //Buscar producto existente
        const productoFiltrado = productos.find(producto => producto._id == _id);
        
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
        articulosCarritos.find(item => infArticulo._id === item._id ? exist = true : exist=false)
        if(exist){
            //Actualizamos la cantidad

            // console.log("Si existe");
            const articulo = articulosCarritos.map( articulo => {
                if(articulo._id === infArticulo._id){
                    articulo.cantidad++; // Retorna el objeto actualizado
                }
                return articulo
            } );
            setArticulosCarritos([...articulo]);
            setPrecioTotal(Number(productoFiltrado.precio) + Number(precioTotal))
        }else{
            //Agregar elemento al arreglo del carrito de compra 
            //utilizando Spread Operator
            // console.log("No existe");
            setArticulosCarritos([...articulosCarritos, infArticulo])    
            setPrecioTotal(Number(productoFiltrado.precio) + Number(precioTotal))
        }
        
        //console.log(articulosCarritos);
       
    };

    const eliminarProducto = (_id) =>{
        
        const productoFiltrado = productos.find(producto => producto._id == _id);
        //console.log(productoFiltrado);
        setArticulosCarritos(articulosCarritos.filter( articulo => articulo._id !== _id ));
        // setArticulosCarritos(articulosCarritos.filter( articulo => articulo._id !== _id ));

        //let total = productos.map( articulo => {return articulo.precio;} );
        let total;
        for ( const producto of articulosCarritos){
            //total += producto[precio];
            if(producto._id  !== _id){
                console.log( producto.precio * producto.cantidad );
                total += producto.precio * producto.cantidad;
                console.log( total);
            }else{
                total += 0;
                console.log( total);
            }
            
        }

        console.log( total);


        // if(productoFiltrado.cantidad < 1){
        //     console.log(Number(precioTotal)-Number(productoFiltrado.precio));
        //     setPrecioTotal(Number(precioTotal)-Number(productoFiltrado.precio));
        // }else{
        //     console.log(Number(precioTotal)-Number(productoFiltrado.precio * productoFiltrado.cantidad));
        //     setPrecioTotal(Number(precioTotal)-Number(productoFiltrado.precio * productoFiltrado.cantidad));
        // }
        //setArticulosCarritos(articulosCarritos.filter( articulo => articulo._id !== _id ));
    };


    return (
        <VentaContext.Provider
            value={{
                añadirProducto,
                articulosCarritos, 
                precioTotal,
                setArticulosCarritos,
                setPrecioTotal,
                eliminarProducto
            }}>

            {children}
        </VentaContext.Provider>
    )
}

export {
    VentaProvider
}

export default VentaContext