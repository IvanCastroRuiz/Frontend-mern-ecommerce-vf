import { useState, useEffect } from 'react'

import Navbar from '../../components/Navbar'
import ProductoVenta from './ProductoVenta'

import useVenta from '../../hooks/useVenta'

const DetalleVenta = () => {

  const [verVenta, setVerVenta] = useState(false)

  useEffect(() => setVerVenta(true), [])

  const { venta, precioTotal } = useVenta()

  return (
    <>
      <Navbar texto="Productos" ruta="" verVenta={verVenta} />

      <div className=" w-full h-5/6 ">
        <div className="w-full flex flex-col mt-24 overflow-hidden">
          <h1 className="font-bold text-5xl uppercase text-center w-full mx-auto">
            Detalles de tu <span className="text-sky-700">pedido</span>
          </h1>
          <div className="p-4 mx-auto w-5/6 sm:px-9 sm:w-2/3 mt-8 shadow-md border-2 h-3/4 overflow-hidden">
            <div className='my-5 flex flex-col items-center md:flex-row md:items-start gap-4 '>
              <div className='w-full md:w-2/3 px-2 h-[37rem]  overflow-y-scroll'>
                {
                  precioTotal > 0 ? (
                    <>
                      {venta.map(item => (
                        <>
                          <ProductoVenta key={item.id} producto={item} verVenta={verVenta}/>
                        </>
                      ))}
                    </>
                  ) : (
                    <p className='text-center uppercase font-bold text-xl my-7 bg-white p-4'>¡No tienes productos en tu carrito!</p>
                  )
                }
              </div>
              <div className='w-full md:w-1/3 h-full flex'>
                <p className=' bg-slate-100 w-full text-center font-bold text-xl block mt-2 uppercase'> <i>SubTotal a Pagar :  </i> <span className='font-medium block'>$ {precioTotal}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetalleVenta