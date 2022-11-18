import { useState } from "react";

import useProductos from "../../hooks/useProductos";

import Navbar from "../../components/Navbar";

const FormularioProductos = () => {
  const { submitProducto } = useProductos();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const generarId = () =>
    Math.random().toString(6).substr(5) + Date.now().toString(16).substr(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, descripcion, precio, stock].includes("")) {
      console.log("CAMPOS VACIOS");
      return;
    }

    submitProducto({ id: generarId(), nombre, descripcion, precio, stock });

    // Limpiar el formulario, BUGUEADO ARREGLAR!!!!!

    setTimeout(() => {
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
    }, 500);
  };

  return (
    <>
      <Navbar texto="Productos" ruta="" />
      <div className=" w-full justify-center h-5/6 items-center">
        <div className="w-full">
          <h1 className="font-bold text-6xl uppercase text-center w-full mx-auto">
            Registra tus <span className="text-sky-700">productos</span>
          </h1>

          <form
            className="p-4 mx-auto w-96 sm:px-9 mt-8 shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label htmlFor="nombre" className="font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="Nombre Producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="descripcion" className="font-medium">
                Descripcion
              </label>
              <input
                type="text"
                id="descripcion"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="Descripcion Productos"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="precio" className="font-medium">
                Precio
              </label>
              <input
                type="number"
                id="precio"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="Precio Producto"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="stock" className="font-medium">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                className="block placeholder-slate-400 p-2 w-full bg-slate-100"
                placeholder="Stock Producto"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Ingresar"
              className="uppercase bg-sky-700 text-white p-2 rounded-md w-full cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default FormularioProductos;
