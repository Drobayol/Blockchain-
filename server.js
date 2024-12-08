const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const app = express();
const port = process.env.PORT || 3000;

const myBlockchain = new Blockchain();

app.use(bodyParser.json());

// Ruta para obtener todos los bloques
app.get('/blocks', (req, res) => {
  res.json(myBlockchain.chain);
});

// Ruta para agregar un nuevo registro de usuario
app.post('/add-user', (req, res) => {
  const { name, lastName, email } = req.body;
  if (!name || !lastName || !email) {
    return res.status(400).send('Faltan campos obligatorios');
  }

  const newBlock = {
    name,
    lastName,
    email,
    timestamp: new Date().toISOString(),
  };

  myBlockchain.addBlock(newBlock);
  res.json({ message: 'Usuario agregado', block: newBlock });
});

// Verificar la cadena
app.get('/validate', (req, res) => {
  const isValid = myBlockchain.isChainValid();
  res.json({ valid: isValid });
});

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
