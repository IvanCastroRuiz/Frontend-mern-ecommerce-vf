import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from '../../hooks/useAuth'
import useVenta from "../../hooks/useVenta";
import { formatearFecha  } from '../../helpers/formatearFecha';
import { formatearCantidad } from '../../helpers/formatearCantidad';

const FilaVenta = ({ venta }) => {
  const { cancelarVenta } = useVenta();
  const { auth } = useAuth();
  const { _id, createdAt, total, estado  } = venta;
  // console.log(_id);
  const [vigente, setVigente] = useState( estado === 'vigente' ? true : false  );

  const showSwal = (e) => {
    if (vigente) {
      Swal.fire({
        icon: "warning",
        title: "<b>¿Desea cambiar el estado de esta venta?</b>",
        showCancelButton: true,
        confirmButtonText: "Si, cambiar",
      }).then((result) => {
        if (result.isConfirmed) {
          setVigente(false);
          cancelarVenta(_id);
        } else if (result.isDenied) {
          setVigente(true);
        }
      });
    }
  };

  return (
    <tr className="text-center bg-slate-100">
      <td>
        <span className="font-small">{_id}</span>
      </td>
      <td>
        <span className="font-medium text-lg">{auth.usuario.nombre}</span>
      </td>
      <td>
        <span className="font-medium text-lg">{formatearFecha(createdAt)}</span>
      </td>
      <td>
        <span className="font-medium text-lg">{formatearCantidad(total)}</span>
      </td>
      <td className=" flex justify-center items-center p-3">
        <button
          className={`${
            vigente
              ? "bg-sky-700  hover:bg-sky-600 "
              : "bg-red-700 hover:bg-red-600 focus:outline-none disabled:opacity-75"
          }  text-white p-2 uppercase text-sm font-medium rounded-lg transition-colors`}
          onClick={(e) => showSwal(e)}
          disabled={!vigente}
        >
          {vigente ? (
            <p>
              Vigente <i className="bi bi-clipboard-check"></i>
            </p>
          ) : (
            <p>
              Cancelado <i className="bi bi-x-circle"></i>
            </p>
          )}
        </button>
      </td>
    </tr>
  );
};

export default FilaVenta;
