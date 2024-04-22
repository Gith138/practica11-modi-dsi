import express from 'express';
import { EliminarCarta, ActualizarCarta } from './ejercicio-pe102.js';


const app = express();

// Ruta para eliminar una carta
app.delete('/cartas/:id/:usuario', async (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = req.params.usuario;

  try {
      const mensaje = await EliminarCarta(id, usuario);
      res.status(200).send(mensaje);
  } catch (error) {
      res.status(400).send(error.message);
  }
});

// Ruta para actualizar una carta
app.put('/cartas/:usuario', async (req, res) => {
  const carta = req.body;
  const usuario = req.params.usuario;

  try {
    const mensaje = await ActualizarCarta(carta, usuario);
    res.status(200).send(mensaje);
  } catch (error: Error) {
    res.status(400).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});