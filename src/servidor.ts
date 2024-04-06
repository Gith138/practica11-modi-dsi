/**
 * Servidor que recibe comandos y los ejecuta en el sistema operativo.
 *  - Escucha en el puerto 3000.
 * - Recibe comandos y los ejecuta en el sistema operativo.
 * - Devuelve la salida de la ejecución del comando al cliente.
 * - Si hay un error, devuelve el mensaje de error al cliente.
 * - Si hay un error en la ejecución del comando, devuelve el mensaje de error al cliente.
 */
import net from 'net';
import { exec } from 'child_process';

/**
 * Crea un servidor que escucha en el puerto 60300.
 * Cuando un cliente se conecta al servidor, recibe un comando del cliente.
 */
net.createServer((socket) => {
    console.log('Cliente conectado');

    //socket.write('Conección establecida');
    socket.on('data', (data) => {
      const command = data.toString().trim();
      console.log('Comando recibido:', command);
      exec(command, (error, stdout, stderr) => { // Ejecuta el comando en el sistema operativo.
        if (error) { // Si hay un error en la ejecución del comando, devuelve el mensaje de error al cliente.
          socket.write(`Error: ${error.message}`);
          return;
        }
        if (stderr) { // Si hay un error, devuelve el mensaje de error al cliente.
          socket.write(`Error: ${stderr}`);
          return;
        }
        socket.write(stdout); // Devuelve la salida de la ejecución del comando al cliente.
      });
    });

    socket.on('close', () => {
      console.log('Cliente desconectado');
    });
  }).listen(60300, () => {
    console.log('Servidor escuchando en el puerto 60300');
  });