import { useEffect } from 'react'
import useProductos from '../../hooks/useProductos'

const EditarProductos = ({ id, setModalEditar }) => {

  const { obtenerProducto, productoState } = useProductos()

  useEffect(() => {
    obtenerProducto(id)
  }, [])

  const { nombre, descripcion, precio, stock } = productoState

  return (
    <div className='flex justify-center bg-slate-500 absolute w-full h-screen top-0 bg-opacity-60'>
      <div className='h-full w-5/6'>
        <div className='w-full py-5 flex items-center h-full'>
          <form className='px-5 mx-auto py-5 sm:px-9 sm:w-5/6 md:w-4/5 lg:w-3/4 shadow-lg bg-white rounded-xl'>

            <button onClick={e => setModalEditar(false)} className='text-black font-bold bg-white text-xl p-4 flex float-right hover:scale-110 '>X</button>

            <h1 className='font-bold text-6xl uppercase text-center w-full mx-auto'>Edita tu <span className='text-sky-700'>producto</span></h1>

            <div className='mb-5'>
              <label htmlFor="nombre" className='font-medium'>Nombre</label>
              <input type="text" id="nombre" className='block placeholder-slate-400 p-2 w-full bg-slate-100' placeholder='ej: Desinfectante' value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>
            <div className='mb-5'>
              <label htmlFor="descripcion" className='font-medium'>Descripcion</label>
              <textarea id="descripcion" className='block placeholder-slate-400 p-2 w-full bg-slate-100 h-52' placeholder='...' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            </div>
            <div className='mb-5'>
              <label htmlFor="precio" className='font-medium'>Precio</label>
              <div className='flex items-center'>
                <span className='font-bold text-xl mr-2'>$</span>
                <input type="number" id="precio" className='placeholder-slate-400 p-2 w-full bg-slate-100' placeholder='ej: 200000' value={precio} onChange={e => setPrecio(e.target.value)} />
              </div>
            </div>
            <div className='mb-5'>
              <label htmlFor="stock" className='font-medium'>Stock</label>
              <input type="number" id="stock" className='block placeholder-slate-400 p-2 w-full bg-slate-100' placeholder="ej: 5" value={stock} onChange={e => setStock(e.target.value)} />
            </div>
            <div className='mb-5'>
              <label htmlFor="stock" className='font-medium'>Imagen</label>
              <input type="file" id="stock" className='block placeholder-slate-400 p-2 w-full bg-slate-100' />
            </div>
            <input type="submit" value="Guardar" className='font-medium uppercase bg-sky-700 text-white p-2 rounded-md w-full cursor-pointer hover:bg-sky-500' />
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditarProductos