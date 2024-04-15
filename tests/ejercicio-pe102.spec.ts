import "mocha";
import { expect } from "chai";
import { EliminarCarta, ActualizarCarta } from "../src/ejercicio-pe102.js";
import { Cartas, Color, Tipo, Rareza } from "../src/cartas.js";
import fs from 'fs';

describe('EliminarCarta tests', () => {
  it('eliminar carta existente', () => {
    // Simulamos una carta que existe
    const id = 1;
    const usuario = 'usuario';
    
    // Llamamos a la función EliminarCarta
    return EliminarCarta(id, usuario)
      .then((mensaje) => {
        // Verificamos que el mensaje sea el esperado
        expect(mensaje).to.equal(`Carta eliminada de la colección de ${usuario}!`);
      })
      .catch((error) => {
        // Si la carta existe y se elimina correctamente, no debería haber errores
        throw error;
      });
  });

  it('eliminar carta inexistente', () => {
    // Simulamos una carta que no existe
    const id = 999;
    const usuario = 'usuario';
    
    // Llamamos a la función EliminarCarta
    return EliminarCarta(id, usuario)
      .catch((error) => {
        // Verificamos que el error sea el esperado
        expect(error).to.equal(`La carta no existe en la colección de ${usuario}!`);
      });
  });
});

describe('ActualizarCarta tests', () => {
  it('actualizar carta existente', () => {
    // Creamos una carta para actualizar
    const carta = new Cartas(303, 'usuario', 5, "verde" as Color, 'Planeswalker' as Tipo, 'Mítica' as Rareza, 'Texto de reglas para el planeswalker aliado', 50, undefined, 5);
    const usuario = 'usuario';
    
    // Llamamos a la función ActualizarCarta
    return ActualizarCarta(carta, usuario)
      .then((mensaje) => {
        // Verificamos que el mensaje sea el esperado
        expect(mensaje).to.equal(`Carta actualizada en la colección de ${usuario}!`);
      })
      .catch((error) => {
        // Si la carta existe y se actualiza correctamente, no debería haber errores
        throw error;
      });
  });

  it('actualizar carta inexistente', () => {
    // Creamos una carta que no existe para actualizar
    const carta = new Cartas(999, 'Carta inexistente', 50, Color.Verde, Tipo.Instantaneo, Rareza.Comun, 'Texto de reglas', 600);
    const usuario = 'usuario';
    
    // Llamamos a la función ActualizarCarta
    return ActualizarCarta(carta, usuario)
      .catch((error) => {
        // Verificamos que el error sea el esperado
        expect(error).to.equal(`La carta no existe en la colección de ${usuario}!`);
      });
  });
});