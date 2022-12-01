import  { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const RutaProtegida = () => {
  const { cargando } = useAuth();

  if(cargando) return 'cargando...'

  return (
    <div className="h-full">
      <Outlet />
    </div>
  )
}

export default RutaProtegida