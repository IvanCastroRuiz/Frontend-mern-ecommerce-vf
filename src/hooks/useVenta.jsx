import { useContext } from "react";

import VentaContext from "../context/VentaProvider";

const useVenta = () => useContext(VentaContext)

export default useVenta;
