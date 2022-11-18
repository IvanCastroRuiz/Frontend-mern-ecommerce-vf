import producto1 from '../../assets/producto.jpg'
import { NavLink } from 'react-router-dom'

const Producto = ({ producto }) => {

    const { id, nombre, precio, stock } = producto

    return (
        <div className='flex flex-col h-1/2 border rounded-lg w-60 bg-white hover:scale-105 overflow-hidden'>
            <NavLink to={`detalle-producto/${id}`}>
                <img src={producto1} alt="producto" className='h-56 w-96 border-b' />
            </NavLink>
            <NavLink to={`detalle-producto/${id}`} className='p-2 flex flex-col justify-between'>
                <div>
                    <p className='font-bold capitalize my-3 text-2xl'>{nombre}</p>
                </div>
                <div className='my-3'>
                    <p className='font-bold text-lg text-ellipsis overflow-hidden'>Precio : <span className='font-normal block'>${precio}</span> </p>
                    <p className='font-bold text-lg'>Stock : <span className='font-normal'>{stock}</span> </p>
                </div>
            </NavLink>
            <button type="button" className='bg-sky-500 text-white p-2  uppercase  font-medium w-full hover:bg-sky-700 transition-colors'>
                Añadir al Carrito
            </button>
        </div>
    )
}

export default Producto