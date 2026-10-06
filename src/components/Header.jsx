function Header({}){
    //Hola Mundo
    return(
<>
		<header id="encabezado">

			<video className="video-fondo" src="video/videoFondo.mp4" autoplay muted loop playsinline></video>
			<div className="titulo">
				<h1>Don Las Maderas <img src="img/fierro.png" alt="logo" width="50" height="50"/></h1>
				<p>Materiales de construccion, herramientas y Madera y mas</p>
			</div>
			<nav id="menu-principal">
				<ul>
					<li><a href="/">Inicio</a></li>
					<li><a href="/productos">Productos</a></li>
					<li><a href="registro.html">Registrarse</a></li>
					<li><a href="login.html">Iniciar Sesión</a></li>
					<li><a href="carrito.html">🛒 Carrito (<span id="carrito-contador">0</span>)</a></li>
				</ul>
			</nav>
		</header>


</>
    )
}

export default Header