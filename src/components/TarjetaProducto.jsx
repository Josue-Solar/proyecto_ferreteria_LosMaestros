import React, {useState} from "react";

function TarjetaProducto({id, imagen, nombre, descripcion, precio}) {
    const [meGusta, setMegusta] = useState(false);
    const alternar = () => {
        if(!meGusta){
            setMegusta(true);
        }else{
            setMegusta(false);
        }
    }
    return(
        <article className="tarjeta">
			<div className="espacio-imagen">
				<img src={imagen} />
			</div>
			<h3>{nombre}</h3>
            <p className="descripcion">{descripcion}</p>
            <p className="precio">${precio}CLP</p>
            <button onClick={alternar} style={{
                backgroundColor: meGusta ? '#bb7915' : '#999b9c',
                color: meGusta ? '#ffffff' : '#0c0c0c',
                fontWeight: "bold",
                borderRadius: '4px'
            }}>
                {meGusta ? 'Eliminar' : 'Guardar'}
            </button>
		</article>
    );
}
export default TarjetaProducto;

/* 
id:1,
            imagen: imgSierra
            nombre: 'Sierra Circular Eléctrica 1400W'
            descripcion: 'Motor potente para cortes rápidos y precisos en madera.'
            precio: '49.990'
*/