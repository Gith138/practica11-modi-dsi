 /*
  Durante prácticas anteriores, debería haber escrito en alguna clase métodos para añadir, modificar, borrar y actualizar la información de una carta de la colección de un usuario:

  Escoja dos de esos métodos y haga uso de llamadas a los métodos del API asíncrona basada en promesas de Node.js para gestionar el sistema de ficheros.
  Haga que sus propios métodos devuelvan promesas.
  Modifique el código fuente que invoca a dichos métodos para gestionar las promesas devueltas por los mismos.
  Lleve a cabo pruebas de ambos métodos.
  */ 
import { Cartas, Color, Rareza, Tipo } from './cartas.js';  
import fs from 'fs/promises';

/**
 * 
 * @param id  id de la carta a eliminar
 * @param usuario nombre del usuario 
 * @returns mensaje de confirmación de eliminación de la carta
 */
export function EliminarCarta(id: number, usuario: string): Promise<string> {
  const directorio_cartas = `./cartas/${usuario}`;
  const RutaCarta = `${directorio_cartas}/${id}.json`;

  return new Promise<string>((resolve, reject) => { // Promesa para eliminar la carta de la colección
    fs.access(RutaCarta, fs.constants.F_OK) // Se verifica si la carta existe
      .then(() => { // Si la carta existe, se elimina
        return fs.unlink(RutaCarta);
      })
      .then(() => { // Se resuelve la promesa con un mensaje de confirmación
        resolve(`Carta eliminada de la colección de ${usuario}!`);
      })
      .catch((err) => { // Si la carta no existe, se rechaza la promesa con un mensaje de error
        if (err.code === 'ENOENT') { // Si la carta no existe
          reject(`La carta no existe en la colección de ${usuario}!`);
        } else {
          reject(`Error al eliminar la carta: ${err.message}`);
        }
      });
  });
}
 
/**
 * 
 * @param carta  objeto Cartas a actualizar
 * @param usuario nombre del usuario
 * @returns mensaje de confirmación de actualización de la carta
 */
export function ActualizarCarta(carta: Cartas, usuario: string): Promise<string> {
  const directorio_cartas = `./cartas/${usuario}`;
  const RutaCarta = `${directorio_cartas}/${carta.id}.json`;

  return new Promise<string>((resolve, reject) => { // Promesa para actualizar la carta en la colección
    fs.access(RutaCarta, fs.constants.F_OK)
      .then(() => { // Si la carta existe, se actualiza
        return fs.writeFile(RutaCarta, JSON.stringify(carta, undefined, 2));
      })
      .then(() => { // Se resuelve la promesa con un mensaje de confirmación
        resolve(`Carta actualizada en la colección de ${usuario}!`);
      })
      .catch((err) => { // Si la carta no existe, se rechaza la promesa con un mensaje de error
        if (err.code === 'ENOENT') {
          reject(`La carta no existe en la colección de ${usuario}!`);
        } else {
          reject(`Error al actualizar la carta: ${err.message}`);
        }
      });
  });
}
