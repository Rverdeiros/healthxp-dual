//Arquivo criado para implementar o código de configuração de conexão do banco de dados.
require('dotenv').config() //Importando a biblioteca dotenv para trabalhar com arquivos de configuração de ambiente do arquivo .env

const { Pool } = require('pg') //Importação da biblioteca postgres para o cypress

//Constante com as informações para conectar ao banco de dados
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

const deleteAndCreateStudent = (req, res) => {

    //student recebe a massa de teste, que deve ser passada na requisição.
    const student = req.body

    const query = `
    WITH Add AS (
    INSERT INTO students (name, email, age, weight, feet_tall)
    VALUES ($1, $2, $3, $4, $5)
    )
    DELETE FROM students WHERE email = $2;
    `
    const values = [
        student.name, student.email, student.age, student.weight, student.feet_tall
    ]

    pool.query(query, values, function (error, result) {
        if (error) {
            //O return encerra a execução caso entre no erro. Caso contrário, rodaria todo o resto.
            return res.status(500).json(error) //retorno do erro no response
        }
        res.status(201).json(result) //retorno de sucesso no response
    })
}

const deleteStudentByEmail = (req, res) => {

    //A constante studentEmail recebe o parâmetro passado na requisição do app.js, nesse caso, o e-mail do usuário
    const studentEmail = req.params.email

    const query = 'DELETE FROM students WHERE email = $1;'

    pool.query(query, [studentEmail], function (error, result) {
        if (error) {
            //O return encerra a execução caso entre no erro. Caso contrário, rodaria todo o resto.
            return res.status(500).json(error) //retorno do erro no response
        }
        res.status(204).end() //retorno de sucesso no response. Para exclusão não devolve nada.
    })
}

const insertEnrollByEmail = (req, res) => {

    const { email, plan_id, price } = req.body

    const query = `
        INSERT INTO enrollments (enrollment_code, student_id, plan_id, credit_card, status, price)
        SELECT
        'XPTO123' as enrollment_code,
        id AS student_id,
        $2 AS plan_id,
        '4242' AS credit_card,
        true as status,
        $3 as price
        FROM students
        WHERE email = $1;
    `
    //Array para receber os parâmetros da query
    const values = [email, plan_id, price]

    //Passar o values como simples, não como array, pois ele já é um array
    pool.query(query, values, function (error, result) {
        if (error) {
            //O return encerra a execução caso entre no erro. Caso contrário, rodaria todo o resto.
            return res.status(500).json(error) //retorno do erro no response
        }
        res.status(201).json(result.rows[0]) //retorno de sucesso no response. Para exclusão não devolve nada.
    })
}


//Exportando a função criada no arquivo db.js
module.exports = {
    deleteAndCreateStudent,
    deleteStudentByEmail,
    // selectStudent
    insertEnrollByEmail
}