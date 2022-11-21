import React from 'react'

import producto1 from '../../assets/producto.jpg'

const ProductoVenta = ({ producto, verVenta }) => {
    // console.log(producto)
    const {id, nombre, descripcion, precio, cantidad} = producto

    return (
        <div className={verVenta ? 'block bg-white my-4 md:flex items-center border' : 'flex w-full h-1/2 border rounded-lg bg-white overflow-hidden my-2'}>
            <div className='flex justify-center'>
                <img src={producto1} alt="producto" className='h-40  md:w-full flex ' />
            </div>
            <div className='p-2 flex flex-col justify-around w-full'>
                <div>
                    <p className='font-bold capitalize my-3 text-2xl'>{nombre}</p>
                </div>
                <div className='my-1 w-full'>
                    <p className='font-bold text-lg text-ellipsis overflow-hidden truncate'>Precio : <span className='font-normal'>${precio}</span> </p>
                    {verVenta && <p className='font-bold text-lg my-1 '>Descripcion : <span className='font-normal truncate'>{descripcion}</span> </p>}
                    <p className='font-bold text-lg'>Cantidad : <span className='font-normal block'>{cantidad}</span> </p>
                </div>
            </div>
        </div>
    )
}

export default ProductoVenta