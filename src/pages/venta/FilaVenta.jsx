import { useState } from "react";
import Swal from "sweetalert2";

const FilaVenta = ({ venta }) => {
  // console.log(venta);

  //const { _id  } = venta;
  //console.log(_id);
  const [vigente, setVigente] = useState(true);

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
        } else if (result.isDenied) {
          setVigente(true);
        }
      });
    }
  };

  return (
    <tr className="text-center bg-slate-100">
      <td>
        <span className="font-medium text-lg">121321321</span>
      </td>
      <td>
        <span className="font-medium text-lg">Ivan Castro</span>
      </td>
      <td>
        <span className="font-medium text-lg">21/11/2022</span>
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
              Vigente <i class="bi bi-clipboard-check"></i>
            </p>
          ) : (
            <p>
              Cancelado <i class="bi bi-x-circle"></i>
            </p>
          )}
        </button>
      </td>
    </tr>
  );
};

export default FilaVenta;
