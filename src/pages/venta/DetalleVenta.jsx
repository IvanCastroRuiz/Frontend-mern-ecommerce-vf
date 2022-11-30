import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatearCantidad } from '../../helpers/formatearCantidad';
import Navbar from "../../components/Navbar";
import ProductoVenta from "./ProductoVenta";

import useVenta from "../../hooks/useVenta";

const DetalleVenta = () => {
  const [verVenta, setVerVenta] = useState(false);

  useEffect(() => setVerVenta(true), []);

  const { articulosCarritos, precioTotal, registrarVenta } = useVenta();

  return (
    <>
      <Navbar 
        texto="Productos" 
        ruta="" 
        verVenta={verVenta} 
      />

      <div className=" w-full h-11/12 ">
        <div className="w-full flex flex-col mt-24 overflow-hidden">
          <h1 className="font-bold text-5xl uppercase text-center w-full mx-auto">
            Detalles de tu <span className="text-sky-700">pedido</span>
          </h1>
          <div className="mx-auto sm:px-2 sm:w-2/3 mt-8 shadow-md border-2 h-3/4">
            <div className="my-5 flex flex-col items-center md:flex-row md:items-start gap-4 ">
              <div className="w-full px-2 h-[37rem] overflow-y-scroll border-y">
                {precioTotal > 0 ? (
                  <>
                    {articulosCarritos.map((item) => (
                      <>
                        <ProductoVenta
                          key={item.id}
                          producto={item}
                          verVenta={verVenta}
                        />
                      </>
                    ))}
                  </>
                ) : (
                  <p 
                    className="text-center uppercase font-bold text-xl my-7 bg-white p-4"
                  >
                    ¡No tienes productos en tu carrito!
                  </p>
                )}
              </div>
              <div 
                className="w-full md:w-1/3 md:h-[37rem] flex flex-col justify-between "
              >
                <div>
                  <p 
                    className=" w-full text-center font-bold text-xl block mt-2 uppercase text-sky-700"
                  >
                    {" "}
                    <i>Total Productos : </i>{" "}
                    <span className="font-medium block text-black">
                      {articulosCarritos.length}
                    </span>
                  </p>
                  <p 
                    className="  w-full text-center font-bold text-xl block mt-2 uppercase text-sky-700"
                  >
                    {" "}
                    <i>Precio total de lista : </i>{" "}
                    <span 
                      className="font-medium block text-black"
                    >
                     {formatearCantidad(precioTotal)}
                    </span>
                  </p>
                </div>
                <button 
                  className="bg-sky-700 text-white rounded-lg uppercase font-medium hover:bg-sky-500 transition-colors p-2"
                  onClick={registrarVenta}
                >
                  <Link 
                    to={precioTotal === 0 ? "/productos" : "/venta/compras-realizadas"  }
                    className="p-2 w-full capitalize"
                  >
                    Venta
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleVenta;
