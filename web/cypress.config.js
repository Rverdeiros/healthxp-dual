const { defineConfig } = require("cypress");
const { Pool } = require('pg') //Importação da biblioteca postgres para o cypress

//Constante com as informações para conectar ao banco de dados
const dbCOnfig = {
  host: 'silly.db.elephantsql.com',
  user: 'fsrlycgt',
  password: 'VYY3bBbUaS843KdnFJKXZ9zPRJ4iloJu',
  database: 'fsrlycgt',
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //Tasks invocadas devem existir dentro desse bloco

      on('task', {

        //Task para deletar o usuário do banco de dados, utilizando o e-mail como parâmetro de busca 
        deleteStudent(studentEmail) {
          return new Promise(function (resolve, reject) {
            const pool = new Pool(dbCOnfig)

            const query = 'DELETE FROM students WHERE email =$1'

            pool.query(query, [studentEmail], function (error, result) {
              if (error) {
                reject({ error: error })
              }
              resolve({ sucess: result })
              pool.end()
            })
          })
        },
        
        // Task para resetar um usuário no banco de dados, deletando (caso exista) e inserindo.
       resetStudent(student) {
          return new Promise(function (resolve, reject) {
            const pool = new Pool(dbCOnfig)

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
                reject({ error: error })
              }
              resolve({ sucess: result })
              pool.end()
            })
          })
        }

        //Task para inserir um usuário no banco de dados
        // insertStudent(student) {
        //   return new Promise(function (resolve, reject) {
        //     const pool = new Pool(dbCOnfig)

        //     const query = `
        //     INSERT INTO students (name, email, age, weight, feet_tall)
        //     VALUES ($1, $2, $3, $4, $5);
        //     `
        //     const values = [
        //       student.name, student.email, student.age, student.weight, student.feet_tall
        //     ]

        //     pool.query(query, values, function (error, result) {
        //       if (error) {
        //         reject({ error: error })
        //       }
        //       resolve({ sucess: result })
        //       pool.end()
        //     })
        //   })
        // }
      })
    },
  },
});
