import { formatearCantidad } from '../../helpers/formatearCantidad';

import { Link } from "react-router-dom";
import useVenta from "../../hooks/useVenta";

import ProductoVenta from "./ProductoVenta";

const AsideVenta = ({ verAside, setAsideVentas }) => {
  const { articulosCarritos, precioTotal, setArticulosCarritos, setPrecioTotal } = useVenta();

  const vaciarCarrito = () => {
    setArticulosCarritos([]);
    setPrecioTotal(0);
  };
  
  return (
    <div
      className={`${
        verAside
          ? " absolute top-20 right-0 bg-slate-200 p-4 overflow-auto z-10 w-full md:w-3/4 lg:w-2/3 mb-96 flex flex-col justify-between h-[37rem]"
          : "hidden"
      }`}
    >
      <div className="overflow-y-scroll mb-3">
        <div className="flex items-center">
          <h1 className="font-bold text-3xl uppercase text-center md:w-2/3 mx-auto">
            Carrito de <span className="text-sky-700">compras</span>
          </h1>
          <button
            onClick={(e) => setAsideVentas(false)}
            className="text-black font-bold bg-slate-200 text-xl mr-6 flex float-right hover:scale-110 "
          >
            X
          </button>
        </div>
        <div className="my-5 ">
          <div className="w-full p-2 ">
            { articulosCarritos ? (
              <>
                {articulosCarritos.map((item) => (
                  <ProductoVenta 
                    key={item._id} 
                    producto={item} 
                  />

                ))}
              </>
            ) : (
              <p className="text-center uppercase font-bold text-xl my-7 bg-white p-4">
                ¡No tienes productos en tu carrito!
              </p>
            )}
          </div>
          <p className="w-full text-center font-bold text-xl  mt-2 uppercase text-sky-700 flex justify-between px-4">
            {" "}
            <i>SubTotal : </i>{" "}
            <span className="font-medium text-black">{formatearCantidad(precioTotal)}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        className="flex bg-sky-700 text-white rounded-lg uppercase font-medium hover:bg-sky-500 transition-colors w-full"
      >
        <Link 
          to="/venta" 
          className="p-2 w-full capitalize"
        >
          Ver detalles del pedido
        </Link>
      </button>

      <button
        type="button"
        className="flex bg-sky-700 text-white rounded-lg uppercase font-medium hover:bg-sky-500 transition-colors w-full mt-2"
        onClick={vaciarCarrito}
      >
        <Link 
          to="/productos" 
          className="p-2 w-full capitalize"
        >
          Vaciar Carrito
        </Link>
      </button>
    </div>
  );
};

export default AsideVenta;
