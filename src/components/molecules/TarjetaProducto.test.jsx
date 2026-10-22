import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import TarjetaProducto from './TarjetaProducto'
import FavoritosProvider from '../../context/FavoritosProvider'

// Datos de ejemplo del producto
const producto = {
  id: 1,
  imagen: 'martillo.jpg',
  nombre: 'Martillo',
  descripcion: 'Martillo de acero reforzado',
  precio: 5990,
}

// El <Link> necesita un Router y el botón de favorito necesita el FavoritosProvider
const renderizarTarjeta = () =>
  render(
    <FavoritosProvider>
      <MemoryRouter>
        <TarjetaProducto {...producto} />
      </MemoryRouter>
    </FavoritosProvider>
  )

describe('TarjetaProducto', () => {
  // Los favoritos se guardan en localStorage: se limpia para que cada prueba parta de cero
  beforeEach(() => localStorage.clear())

  // CASO 1: Muestra la información del producto
  it('Debe mostrar el nombre, la descripción y la imagen del producto', () => {
    renderizarTarjeta()

    expect(screen.getByRole('link', { name: /Martillo/ })).toBeTruthy()
    expect(screen.getByText('Martillo de acero reforzado')).toBeTruthy()
    expect(screen.getByAltText('Martillo').getAttribute('src')).toBe('martillo.jpg')
  })

  // CASO 2: Formato del precio
  it('Debe mostrar el precio con formato chileno', () => {
    renderizarTarjeta()

    // 5990 se muestra como "$5.990"
    expect(screen.getByText('$5.990')).toBeTruthy()
  })

  // CASO 3: Enlace al detalle
  it('Debe tener un enlace "Ver detalle" que apunte a la página del producto', () => {
    renderizarTarjeta()

    const enlace = screen.getByRole('link', { name: /Ver detalle/i })
    expect(enlace.getAttribute('href')).toBe('/producto/1')
  })

  // CASO 4: Estado inicial del botón de favorito
  it('Debe mostrar el botón "Agregar a favoritos" al inicio', () => {
    renderizarTarjeta()

    expect(screen.getByRole('button', { name: 'Agregar Martillo a favoritos' })).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Quitar Martillo de favoritos' })).toBeNull()
  })

  // CASO 5: Cambio al hacer clic
  it('Debe cambiar a "Quitar de favoritos" al hacer clic', () => {
    renderizarTarjeta()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar Martillo a favoritos' }))

    expect(screen.getByRole('button', { name: 'Quitar Martillo de favoritos' })).toBeTruthy()
  })

  // CASO 6: Volver al estado inicial con un segundo clic
  it('Debe volver a "Agregar a favoritos" al hacer clic por segunda vez', () => {
    renderizarTarjeta()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar Martillo a favoritos' }))
    fireEvent.click(screen.getByRole('button', { name: 'Quitar Martillo de favoritos' }))

    expect(screen.getByRole('button', { name: 'Agregar Martillo a favoritos' })).toBeTruthy()
  })

  // CASO 7: El favorito queda guardado en localStorage
  it('Debe guardar el favorito en localStorage', () => {
    renderizarTarjeta()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar Martillo a favoritos' }))

    expect(JSON.parse(localStorage.getItem('favoritosFerreteria'))).toEqual([1])
  })
})
