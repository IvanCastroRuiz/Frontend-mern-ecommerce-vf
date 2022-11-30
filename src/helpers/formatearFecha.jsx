export const formatearFecha = (fecha) =>{
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha);
}