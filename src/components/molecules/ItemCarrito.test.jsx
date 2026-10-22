import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ItemCarrito from './ItemCarrito'

const item = {
  id: 'martillo',
  imagen: 'martillo.jpg',
  nombre: 'Martillo',
  cantidad: 2,
  precio: 5990,
}

describe('ItemCarrito', () => {
  it('Debe mostrar nombre, cantidad y subtotal con formato chileno', () => {
    render(<ItemCarrito {...item} onQuitar={() => {}} />)
    expect(screen.getByText('Martillo', { selector: 'h3' })).toBeTruthy()
    expect(screen.getByText('Cantidad: 2')).toBeTruthy()
    expect(screen.getByText('$11.980')).toBeTruthy()
  })

  it('Debe llamar a onQuitar con el id al presionar "Quitar"', () => {
    const onQuitar = vi.fn()
    render(<ItemCarrito {...item} onQuitar={onQuitar} />)
    fireEvent.click(screen.getByRole('button', { name: 'Quitar' }))
    expect(onQuitar).toHaveBeenCalledWith('martillo')
  })
})
