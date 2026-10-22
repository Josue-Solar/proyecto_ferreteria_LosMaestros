import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect, beforeEach } from 'vitest'
import Login from './Login'
import TemaProvider from '../context/TemaProvider'
import { obtenerSesion } from '../utils/sesion'

const renderizar = () =>
  render(
    <TemaProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/panel" element={<p>Pagina del panel</p>} />
        </Routes>
      </MemoryRouter>
    </TemaProvider>
  )

const completar = (usuario, clave) => {
  fireEvent.change(screen.getByLabelText('Nombre de usuario'), { target: { value: usuario } })
  fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: clave } })
  fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))
}

describe('Login', () => {
  beforeEach(() => localStorage.clear())

  it('Debe mostrar los campos usuario y contraseña (oculta)', () => {
    renderizar()
    expect(screen.getByLabelText('Nombre de usuario')).toBeTruthy()
    expect(screen.getByLabelText('Contraseña').getAttribute('type')).toBe('password')
  })

  it('Debe mostrar error y no guardar sesión con credenciales incorrectas', () => {
    renderizar()
    completar('admin', 'mala')
    expect(screen.getByText('Usuario o contraseña incorrectos')).toBeTruthy()
    expect(obtenerSesion()).toBeNull()
  })

  it('Debe guardar la sesión y llevar al panel con credenciales correctas', () => {
    renderizar()
    completar('admin', 'maestros2026')
    expect(screen.getByText('Pagina del panel')).toBeTruthy()
    expect(obtenerSesion().usuario).toBe('admin')
  })

  it('Debe quitar el error al volver a escribir', () => {
    renderizar()
    completar('admin', 'mala')
    fireEvent.change(screen.getByLabelText('Nombre de usuario'), { target: { value: 'admi' } })
    expect(screen.queryByText('Usuario o contraseña incorrectos')).toBeNull()
  })
})
