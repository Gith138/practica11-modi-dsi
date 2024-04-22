import { Document, connect, model, Schema } from 'mongoose';
import {Cartas} from './magic-app.js';

// Definir el esquema para la carta
const cartaSchema = new Schema<Cartas>({
  id: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  coste_mana: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    enum: ["Blanco", "Azul", "Negro", "Rojo", "Verde", "Incoloro", "Multicolor"],
    required: true
  },
  tipo: {
    type: String,
    enum: ["Tierra", "Criatura", "Encantamiento", "Conjuro", "Instantaneo", "Artefacto", "Planeswalker"],
    required: true
  },
  rareza: {
    type: String,
    enum: ["Comun", "Infrecuente", "Rara", "Mitica"],
    required: true
  },
  texto_reglas: {
    type: String,
    required: true
  },
  valor_mercado: {
    type: Number,
    required: true
  },
  fuerza_resistencia: {
    type: [Number], // Será un array de números [fuerza, resistencia]
    required: function() {
      return this.tipo === "Criatura";
    }
  },
  marcas_lealtad: {
    type: Number,
    required: function() {
      return this.tipo === "Planeswalker";
    }
  }
});

const Carta = model<Cartas>('Cards', cartaSchema);

// Exportar el esquema para poder utilizarlo en otros archivos de la aplicación
module.exports = cartaSchema;


export function EliminarCarta(id: number, usuario: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // Buscar la carta por ID en la base de datos
        Carta.findByIdAndDelete(id)
            .then((deletedCarta) => {
                if (!deletedCarta) {
                    // Si la carta no se encuentra en la base de datos
                    reject(`La carta no existe en la colección de ${usuario}!`);
                } else {
                    // La carta se eliminó correctamente
                    resolve(`Carta eliminada de la colección de ${usuario}!`);
                }
            })
            .catch((error) => {
                // Si hay algún error durante la eliminación
                reject(`Error al eliminar la carta: ${error}`);
            });
    });
}

export function ActualizarCarta(carta: Cartas, usuario: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        // Buscar la carta por ID en la base de datos y actualizarla
        Carta.findByIdAndUpdate(carta.id, carta)
            .then((updatedCarta) => {
                if (!updatedCarta) {
                    // Si la carta no se encuentra en la base de datos
                    reject(`La carta no existe en la colección de ${usuario}!`);
                } else {
                    // La carta se actualizó correctamente
                    resolve(`Carta actualizada en la colección de ${usuario}!`);
                }
            })
            .catch((error) => {
                // Si hay algún error durante la actualización
                reject(`Error al actualizar la carta: ${error}`);
            });
    });
}
