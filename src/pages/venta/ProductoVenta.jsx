
import useVenta from "../../hooks/useVenta";
import producto1 from "../../assets/producto.jpg";

const ProductoVenta = ({ producto, verVenta }) => {
  const { eliminarProducto } = useVenta();
  const { _id, nombre, descripcion, precio, url, cantidad } = producto;
  //console.log(url);

  return (
    <div
      className={
        verVenta
          ? "block lg:flex w-full lg:h-56 border rounded-lg bg-white overflow-hidden my-2 justify-between"
          : "flex w-full h-1/2 border rounded-lg bg-white overflow-hidden my-2 justify-between"
      }
    >
      <div className={verVenta ? "flex w-full" : "flex"}>
        <div className="w-36 flex items-center px-2 py-2 lg:w-44">
          <img
            src={url ? `${url}` : producto1}
            alt="imagen producto"
            className="h-44"
          />
        </div>
        <div
          className={
            verVenta
              ? "w-36 md:w-52 lg:w-3/4  flex flex-col justify-center py-5"
              : "w-36 md:w-52 lg:w-52 flex flex-col justify-center"
          }
        >
          <p className="font-medium text-base uppercase">
            Nombre :{" "}
            <span className="font-normal block capitalize">{nombre}</span>
          </p>

          <p className={`${!verVenta && ""} font-medium text-base uppercase`}>
            Precio :{" "}
            <span className="font-normal block truncate capitalize md:w-full">
              $ {precio}
            </span>
          </p>

          {verVenta && (
            <p className="font-medium text-base uppercase break-words overflow-hidden h-20">
              {" "}
              Descripcion :{" "}
              <span className="font-normal block normal-case ">
                {descripcion}
              </span>
            </p>
          )}

          <p className="font-medium  text-base uppercase">
            Cantidad : <span className="font-normal ">{cantidad}</span>
          </p>
        </div>
      </div>
      <button
        className={`${
          verVenta && "w-full lg:w-24"
        } bg-red-700 p-3 uppercase text-white font-medium hover:bg-red-500`}
        onClick={e => eliminarProducto(_id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default ProductoVenta;
