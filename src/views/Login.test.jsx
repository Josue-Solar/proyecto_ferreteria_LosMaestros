import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import Login from './Login'
import { CREDENCIALES, haySesion } from '../utils/sesion'

const renderizar = () =>
  render(
    <MemoryRouter initialEntries={['/Login']}>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<p>Pagina de inicio</p>} />
      </Routes>
    </MemoryRouter>
  )

const completar = (usuario, password) => {
  fireEvent.change(screen.getByLabelText('Usuario:'), { target: { value: usuario } })
  fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: password } })
  fireEvent.click(screen.getByRole('button', { name: 'INGRESAR' }))
}

describe('Login', () => {
  beforeEach(() => localStorage.clear())

  it('Debe mostrar los campos usuario y contraseña (oculta)', () => {
    renderizar()
    expect(screen.getByLabelText('Usuario:')).toBeTruthy()
    expect(screen.getByLabelText('Contraseña:').getAttribute('type')).toBe('password')
  })

  it('Debe mostrar error y no guardar sesión con credenciales incorrectas', () => {
    renderizar()
    completar('admin', 'mala')
    expect(screen.getByText('Usuario o contraseña incorrectos')).toBeTruthy()
    expect(haySesion()).toBe(false)
  })

  it('Debe guardar la sesión y volver al inicio con credenciales correctas', () => {
    renderizar()
    completar(CREDENCIALES.usuario, CREDENCIALES.password)
    expect(screen.getByText('Pagina de inicio')).toBeTruthy()
    expect(haySesion()).toBe(true)
  })

  it('Debe quitar el error al volver a escribir', () => {
    renderizar()
    completar('admin', 'mala')
    fireEvent.change(screen.getByLabelText('Usuario:'), { target: { value: 'admi' } })
    expect(screen.queryByText('Usuario o contraseña incorrectos')).toBeNull()
  })
})
