/**
 * Enumeración de los colores de las cartas.
 */
export enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

/**
 * Enumeración de los tipos de las cartas.
 */
export enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

/**
 * Enumeración de las rarezas de las cartas.
 */
export enum Rareza {
  Comun = "Comun",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mitica"
}

/**
 * Representa una carta del juego.
 */
export class Cartas {
  /**
   * Crea una instancia de la clase Cartas.
   * @param id - El identificador de la carta.
   * @param nombre - El nombre de la carta.
   * @param coste_mana - El coste de mana de la carta.
   * @param color - El color de la carta.
   * @param tipo - El tipo de la carta.
   * @param rareza - La rareza de la carta.
   * @param texto_reglas - El texto de las reglas de la carta.
   * @param valor_mercado - El valor de mercado de la carta.
   * @param fuerza_resistencia - La fuerza y resistencia de la carta (solo para cartas de tipo Criatura).
   * @param marcas_lealtad - Las marcas de lealtad de la carta (solo para cartas de tipo Planeswalker).
   */
  constructor( public id: number, public nombre: string, public coste_mana: number, public color: Color, public tipo: Tipo, public rareza: Rareza, public texto_reglas: string, public valor_mercado: number, public fuerza_resistencia?: [number, number], public marcas_lealtad?: number) {
    this.id = id;
    this.nombre = nombre;
    this.coste_mana = coste_mana;
    this.color = color;
    this.tipo = tipo;
    this.rareza = rareza;
    this.texto_reglas = texto_reglas;
    this.valor_mercado = valor_mercado;
    if (tipo === Tipo.Criatura) {
      this.fuerza_resistencia = fuerza_resistencia;
    }
    if (tipo === Tipo.Planeswalker) {
      this.marcas_lealtad = marcas_lealtad;
    }
  }
}