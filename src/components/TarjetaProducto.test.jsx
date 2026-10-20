import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TarjetaProducto from './TarjetaProducto';

// Datos de ejemplo del producto
const producto = {
  id: 1,
  imagen: 'martillo.jpg',
  nombre: 'Martillo',
  descripcion: 'Martillo de acero reforzado',
  precio: 5990,
};

// Función auxiliar: el <Link> necesita un Router, por eso se envuelve en MemoryRouter
const renderizarTarjeta = () =>
  render(
    <MemoryRouter>
      <TarjetaProducto {...producto} />
    </MemoryRouter>
  );

describe('TarjetaProducto', () => {

  // CASO 1: Muestra la información del producto
  it('Debe mostrar el nombre, la descripción y la imagen del producto', () => {
    // ARRANGE
    renderizarTarjeta();

    // ASSERT
    expect(screen.getByText('Martillo', { selector: 'h3' })).toBeTruthy();
    expect(screen.getByText('Martillo de acero reforzado')).toBeTruthy();
    expect(screen.getByAltText('Martillo').getAttribute('src')).toBe('martillo.jpg');
  });

  // CASO 2: Formato del precio
  it('Debe mostrar el precio con formato chileno', () => {
    // ARRANGE
    renderizarTarjeta();

    // ASSERT: 5990 se muestra como "$5.990"
    expect(screen.getByText('$5.990')).toBeTruthy();
  });

  // CASO 3: Enlace al detalle
  it('Debe tener un enlace "Ver detalle" que apunte a la página del producto', () => {
    // ARRANGE
    renderizarTarjeta();

    // ASSERT
    const enlace = screen.getByRole('link', { name: /Ver detalle/i });
    expect(enlace.getAttribute('href')).toBe('/producto/1');
  });

  // CASO 4: Estado inicial del botón
  it('Debe mostrar el botón con el texto "Guardar" al inicio', () => {
    // ARRANGE
    renderizarTarjeta();

    // ASSERT
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Guardado' })).toBeNull();
  });

  // CASO 5: Cambio de texto al hacer clic
  it('Debe cambiar el texto del botón a "Guardado" al hacer clic', () => {
    // ARRANGE
    renderizarTarjeta();
    const boton = screen.getByRole('button', { name: 'Guardar' });

    // ACT
    fireEvent.click(boton);

    // ASSERT
    expect(screen.getByRole('button', { name: 'Guardado' })).toBeTruthy();
  });

  // CASO 6: Volver al estado inicial con un segundo clic
  it('Debe volver a "Guardar" al hacer clic por segunda vez', () => {
    // ARRANGE
    renderizarTarjeta();
    const boton = screen.getByRole('button', { name: 'Guardar' });

    // ACT
    fireEvent.click(boton);
    fireEvent.click(screen.getByRole('button', { name: 'Guardado' }));

    // ASSERT
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeTruthy();
  });

  // CASO 7: Cambio de color del botón
  it('Debe cambiar el color de fondo del botón al guardar', () => {
    // ARRANGE
    renderizarTarjeta();
    const boton = screen.getByRole('button', { name: 'Guardar' });
    const colorInicial = boton.style.backgroundColor;

    // ACT
    fireEvent.click(boton);

    // ASSERT: #bb7915 en formato rgb
    expect(boton.style.backgroundColor).toBe('rgb(187, 121, 21)');
    expect(boton.style.backgroundColor).not.toBe(colorInicial);
  });
});