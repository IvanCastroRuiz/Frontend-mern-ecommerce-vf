import React from 'react'

import { Link } from 'react-router-dom'
import useVenta from '../../hooks/useVenta'

import ProductoVenta from './ProductoVenta'

const AsideVenta = ({ verAside, setAsideVentas }) => {

  const { venta, precioTotal } = useVenta()

  return (
    <div div className={`${verAside ? ' absolute top-20 right-0 bg-slate-200 p-4 overflow-auto z-10 w-full md:w-3/4 lg:w-2/5 mb-96 flex flex-col justify-between h-[37rem]' : 'hidden'}`}>

      <div className='overflow-y-scroll mb-3'>
        <div className='flex items-center'>
          <h1 className='font-bold text-3xl uppercase text-center md:w-2/3 mx-auto'>Carrito de <span className='text-sky-700'>compras</span></h1>
          <button onClick={e => setAsideVentas(false)} className='text-black font-bold bg-slate-200 text-xl mr-6 flex float-right hover:scale-110 '>X</button>
        </div>
        <div className='my-5 '>
          <div className='w-full p-2 '>
            {
              precioTotal > 0 ? (
                <>
                  {venta.map(item => (
                    <>
                      <ProductoVenta key={item.id} producto={item} />
                    </>
                  ))}
                </>
              ) : (
                <p className='text-center uppercase font-bold text-xl my-7 bg-white p-4'>¡No tienes productos en tu carrito!</p>
              )
            }
          </div>
          <p className='w-full text-center font-bold text-xl block mt-2 uppercase'> <i>SubTotal : .......... $</i> <span className='font-medium'>{precioTotal}</span></p>
        </div>
      </div>

      <button type="button" className="flex bg-sky-700 text-white rounded-lg uppercase font-medium hover:bg-sky-500 transition-colors w-full">
        <Link to="/venta" className='p-2 w-full capitalize'>
          Ver detalles del pedido
        </Link>
      </button>

    </div>
  )
}

export default AsideVenta