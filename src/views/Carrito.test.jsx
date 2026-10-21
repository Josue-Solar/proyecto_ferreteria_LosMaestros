import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import Carrito from './Carrito'
import { agregarAlCarrito, obtenerCarrito } from '../utils/carrito'

const martillo = { id: 'martillo', nombre: 'Martillo', precio: 5990, imagen: 'm.jpg' }
const renderizar = () => render(<MemoryRouter><Carrito /></MemoryRouter>)

describe('Carrito (vista)', () => {
  beforeEach(() => localStorage.clear())

  it('Muestra mensaje de carrito vacío', () => {
    renderizar()
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
  })

  it('Muestra los productos y el total', () => {
    agregarAlCarrito(martillo, 2)
    renderizar()
    expect(screen.getByText('Martillo', { selector: 'h3' })).toBeTruthy()
    expect(screen.getByText('Total: $11.980')).toBeTruthy()
  })

  it('Quitar elimina el producto y deja el carrito vacío', () => {
    agregarAlCarrito(martillo, 1)
    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Quitar' }))
    expect(screen.getByText(/Tu carrito está vacío/)).toBeTruthy()
    expect(obtenerCarrito()).toEqual([])
  })

  it('Simular pago muestra confirmación y vacía el carrito', () => {
    agregarAlCarrito(martillo, 1)
    renderizar()
    fireEvent.click(screen.getByRole('button', { name: 'Simular pago' }))
    expect(screen.getByText(/Pago simulado por \$5\.990/)).toBeTruthy()
    expect(obtenerCarrito()).toEqual([])
  })
})
