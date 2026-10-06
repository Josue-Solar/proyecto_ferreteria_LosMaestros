import TarjetaProducto from "./TarjetaProducto";

function GaleriaProductos({productos}) {
    return(
        <div className="galeria">
            {productos.map((producto) =>(
                <TarjetaProducto
                    imagen={producto.imagen}
                    nombre={producto.nombre}
                    descripcion={producto.descripcion}
                    precio={producto.precio}
                />

            ))}

        </div>

    );
}

export default GaleriaProductos;