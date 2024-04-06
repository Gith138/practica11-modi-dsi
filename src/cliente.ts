/**
 * Cliente que se conecta al servidor y envía un comando para ejecutar en el servidor.
 * - Se conecta al servidor en el puerto 3000.
 * - Envía un comando al servidor.
 * - Recibe la respuesta del servidor.
 * - Cierra la conexión.
 */
import net from 'net';
import readline from 'readline';

/**
 * Crea una interfaz de lectura y escritura para leer el comando del usuario.
 * Crea un cliente que se conecta al servidor en el puerto 3000.
 * Cuando se conecta al servidor, pide al usuario que ingrese un comando.
 */
const leerservidor = readline.createInterface({
  input: process.stdin, //  Esta propiedad especifica de dónde se leerán los datos de entrada
  output: process.stdout // Especifica donde se van a escribir los datos de salida
});

const client = new net.Socket(); // Crea un cliente que se conecta al servidor en el puerto 60300
/**
 * Se conecta al servidor en el puerto 3000.
 * Cuando se conecta al servidor, pide al usuario que ingrese un comando.
 * Cuando recibe datos del servidor, imprime la respuesta del servidor.
 */
client.connect(60300, 'localhost', () => { // Se conecta al servidor en el puerto 60300.
  console.log('Conectado al servidor');
  leerservidor.question('Ingrese el comando a ejecutar: ', (command) => { // Muestra un mensaje al usuario y espera a que responda el usuario
    client.write(command); // Envía el comando al servidor.
  });
});
/**
 * Cuando recibe datos del servidor, imprime la respuesta del servidor.
 * Cuando se cierra la conexión, imprime el mensaje de cierre de conexión.
 */
client.on('data', (data) => { 
  console.log('Respuesta del servidor:', data.toString());
  leerservidor.close(); // Cierra la interfaz de lectura y escritura.
});

client.on('close', () => {
  const message = JSON.parse(client.read().toString());
});