//Arquivo criado para criar e compartilhar comandos via API dentro do projeto.

const express = require('express') //importação do framework express
const app = express() //instanciando o express
const Joi = require('joi') //importanto a biblioteca joi
const validator = require('express-joi-validation').createValidator({ passError: true }) //importanto o validation e criando o valodator da biblioteca joi

//Comando para habilitar o uso de json no express
app.use(express.json())

const db = require('./db') //importando as funções criada no arquivo db.js

//Rota do tipo GET, na "/" que recebe request e response
app.get('/', function (req, res) {
  res.json({ message: "Hello API Helper" })
})

//schema de validações usando a biblioteca joi
const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  weight: Joi.number().required(),
  feet_tall: Joi.number().required()
})

//Método POST para criar um student
//validator.body para validar de acordo com o schema criado acima
app.post('/students', validator.body(studentSchema), db.deleteAndCreateStudent)

//Método DELETE recebendo o e-mail como parâmetro
app.delete('/students/:email', db.deleteStudentByEmail)
app.post('/enrolls', db.insertEnrollByEmail)

//Bloco de código para habilitar o retorno do erro em JSON pela biblioteca JOI.
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res.status(400).json({
      type: err.type, // will be "query" here, but could be "headers", "body", or "params"
      message: err.error.toString()
    });
  } else {
    // pass on to another error handler
    next(err);
  }
});

app.listen(5000)

//Instalar nodemon
//npx nodemon app.js para iniciar o monitoramento node da aplicação.