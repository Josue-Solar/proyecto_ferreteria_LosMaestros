# Ferretería Los Maestros (React)

Migración de la tienda web de HTML/CSS/JS a **React** para la Evaluación 2.
Stack: React 19 · Vite · react-router-dom · React Bootstrap · Vitest + Testing Library.

## Cómo ejecutarlo

```bash
npm install     # instala dependencias
npm run dev     # servidor de desarrollo (http://localhost:5173)
npm test        # pruebas unitarias (Vitest)
npm run build   # build de producción
```

## Credenciales de prueba

| Usuario | Contraseña |
| ------- | ---------- |
| `admin` | `maestros2026` |

Las rutas `/perfil` y `/panel` están protegidas: sin sesión redirigen a `/login` y, al ingresar, vuelven a la página que se quería ver (por defecto `/panel`).

## Páginas

| Ruta | Contenido |
| ---- | --------- |
| `/` | Inicio con catálogo destacado |
| `/productos` | Catálogo con filtros y favoritos |
| `/producto/:id` | Detalle y "Agregar al carrito" |
| `/carrito` | Carrito con total y pago simulado |
| `/registro` | Formulario con validaciones (incluye tipo de cliente y comuna) |
| `/login` | Inicio de sesión (credenciales estáticas) |
| `/perfil` | Datos del administrador (protegida) |
| `/panel` | Panel de control: CRUD de productos (protegida) |
| `*` | Página 404 |

## Persistencia (localStorage)

| Clave | Contenido |
| ----- | --------- |
| `sesionFerreteria` | Sesión del administrador (sin contraseña) |
| `carritoFerreteria` | Productos del carrito |
| `favoritosFerreteria` | Ids de productos favoritos |
| `temaFerreteria` | Tema claro/oscuro |
| `productosFerreteria` | Catálogo editado desde el panel (el botón "Restablecer catálogo original" lo borra) |

## Estructura (Atomic Design)

```
src/
├─ components/
│  ├─ atoms/        BotonFavorito, BotonLink, BotonTema, InsigniaStock
│  ├─ molecules/    Formulario, Seccion, TarjetaProducto, ItemCarrito, BarraFiltros, DatoPerfil, FilaProductoAdmin
│  ├─ organisms/    Header, Footer, FormularioRegistro, FormularioProducto, GaleriaProductos, TablaProductoAdmin, TarjetaPerfil
│  └─ templates/    PlantillaPagina (Header + contenido + Footer)
├─ views/           Páginas (Home, Productos, ProductoDetalle, Carrito, Registro, Login, Perfil, PanelControl, NotFound)
├─ routes/          RutaProtegida
├─ context/         Tema y Favoritos (Context API)
├─ data/            Productos, menú y opciones de formularios
└─ utils/           Sesión, carrito, validaciones, almacenamiento de productos
```

## Pruebas

26 pruebas unitarias (ver `plan_de_pruebas.md`): `TarjetaProducto`, `FormularioRegistro`, `ItemCarrito`, `Login` y `Carrito`.

## Equipo

Josue Solar · karmey37 · Fabian Estay — DuocUC.
