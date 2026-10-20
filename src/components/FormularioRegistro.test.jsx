import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormularioRegistro from './FormularioRegistro';

// Datos válidos de ejemplo (ajústalos si tu validarRegistro pide otras reglas)
const datosValidos = {
  nombre: 'Pepito',
  edad: '26',
  telefono: '+56912345678',
  correo: 'pepito@gmail.com',
  fechaNacimiento: '2000-01-15',
};

// Función auxiliar: escribe en todos los campos del formulario
const llenarFormulario = (datos) => {
  fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: datos.nombre } });
  fireEvent.change(screen.getByLabelText(/Edad/i), { target: { value: datos.edad } });
  fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: datos.telefono } });
  fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: datos.correo } });
  fireEvent.change(screen.getByLabelText(/Fecha de nacimiento/i), { target: { value: datos.fechaNacimiento } });
};



describe('FormularioRegistro', () => {

  // CASO 1: Renderizado
  it('Debe mostrar todos los campos y los botones del formulario', () => {
    // ARRANGE
    render(<FormularioRegistro />);

    // ASSERT
    const inputNombre = screen.getByLabelText(/Nombre/i);
    expect(screen.getByLabelText(/Nombre/i)).toBeTruthy();
    expect(screen.getByLabelText(/Edad/i)).toBeTruthy();
    expect(screen.getByLabelText(/Teléfono/i)).toBeTruthy();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeTruthy();
    expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Limpiar/i })).toBeTruthy();
  });

  // CASO 2: Escritura en un campo
  it('Debe permitir al usuario escribir texto en el campo "Nombre"', () => {
    // ARRANGE
    render(<FormularioRegistro />);
    const inputNombre = screen.getByLabelText(/Nombre/i);

    // ACT
    fireEvent.change(inputNombre, { target: { value: 'Pepito' } });

    // ASSERT
    expect(inputNombre.value).toBe('Pepito');
  });

  // CASO 3: Escritura en todos los campos
  it('Debe guardar el valor escrito en cada uno de los campos', () => {
    // ARRANGE
    render(<FormularioRegistro />);

    // ACT
    llenarFormulario(datosValidos);

    // ASSERT
    expect(screen.getByLabelText(/Nombre/i).value).toBe('Pepito');
    expect(screen.getByLabelText(/Edad/i).value).toBe('26');
    expect(screen.getByLabelText(/Teléfono/i).value).toBe('+56912345678');
    expect(screen.getByLabelText(/Correo electrónico/i).value).toBe('pepito@gmail.com');
    expect(screen.getByLabelText(/Fecha de nacimiento/i).value).toBe('2000-01-15');
  });

  // CASO 4: Envío con campos vacíos
  it('Debe marcar los campos como inválidos si se envía el formulario vacío', () => {
    // ARRANGE
    render(<FormularioRegistro />);

    // ACT
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT: react-bootstrap agrega la clase "is-invalid" a los campos con error
    expect(screen.getByLabelText(/Nombre/i).className).toContain('is-invalid');
    expect(screen.queryByText(/Registro exitoso/i)).toBeNull();
  });

  // CASO 5: Envío con datos inválidos
  it('Debe marcar el correo como inválido si el formato es incorrecto', () => {
    // ARRANGE
    render(<FormularioRegistro />);
    llenarFormulario({ ...datosValidos, correo: 'correo-malo' });

    // ACT
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    expect(screen.getByLabelText(/Correo electrónico/i).className).toContain('is-invalid');
    expect(screen.queryByText(/Registro exitoso/i)).toBeNull();
  });

  // CASO 6: Registro exitoso
  it('Debe mostrar el mensaje de éxito con el nombre al registrar datos válidos', () => {
    // ARRANGE
    render(<FormularioRegistro />);
    llenarFormulario(datosValidos);

    // ACT
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    expect(screen.getByText(/Registro exitoso/i)).toBeTruthy();
    expect(screen.getByText(/Pepito/i)).toBeTruthy();
  });

  // CASO 7: El formulario se vacía tras registrarse
  it('Debe limpiar los campos después de un registro exitoso', () => {
    // ARRANGE
    render(<FormularioRegistro />);
    llenarFormulario(datosValidos);

    // ACT
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));

    // ASSERT
    expect(screen.getByLabelText(/Nombre/i).value).toBe('');
    expect(screen.getByLabelText(/Correo electrónico/i).value).toBe('');
  });

  // CASO 8: Botón Limpiar
  it('Debe vaciar los campos y quitar los errores al presionar "Limpiar"', () => {
    // ARRANGE
    render(<FormularioRegistro />);
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Pepito' } });
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i })); // genera errores

    // ACT
    fireEvent.click(screen.getByRole('button', { name: /Limpiar/i }));

    // ASSERT
    expect(screen.getByLabelText(/Nombre/i).value).toBe('');
    expect(screen.getByLabelText(/Correo electrónico/i).className).not.toContain('is-invalid');
  });

  // CASO 9: El error desaparece al corregir el campo
  it('Debe quitar el error de un campo cuando el usuario empieza a escribir en él', () => {
    // ARRANGE
    render(<FormularioRegistro />);
    fireEvent.click(screen.getByRole('button', { name: /Registrarse/i }));
    const inputNombre = screen.getByLabelText(/Nombre/i);
    expect(inputNombre.className).toContain('is-invalid');

    // ACT
    fireEvent.change(inputNombre, { target: { value: 'Pepito' } });

    // ASSERT
    expect(inputNombre.className).not.toContain('is-invalid');
  });
});
