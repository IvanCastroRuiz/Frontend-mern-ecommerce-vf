export const formatearCantidad = (cantidad) => { 
    return Number(cantidad)
        .toLocaleString('es-CO',{ 
                            style: 'currency',
                            currency: 'COP' 
                            }
                        )
}