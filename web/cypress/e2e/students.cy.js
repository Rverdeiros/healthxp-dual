//import { faker } from "@faker-js/faker";
import students from '../fixtures/students.json'
import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {

    it('deve poder cadastrar um novo aluno', () => {
        const student = students.create

        // cy.task('deleteStudent', student.email)
        cy.deleteStudent(student.email) //Custom command criada após mover as tasks para app.js
        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('não deve cadastrar com e-mail duplicado', () => {

        //Massa utilizada no teste
        const student = students.duplicate

        //Ações no banco de dados
        // cy.task('resetStudent', student)
        cy.resetStudent(student) //Custom command criada após mover as tasks para app.js

        //Ações para adicionar o usuário via sistema
        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')

    })

    it('deve remover um aluno sem matrícula', () => {
        const student = students.remove

        //Deleta e insere o aluno via banco
        // cy.task('resetStudent', student)
        cy.resetStudent(student) //Custom command criada após mover as tasks para app.js


        //Faz o login como admin
        cy.adminLogin()

        //busca e remove o aluno
        studentPage.search(student.name)
        studentPage.remove(student.email)

        //confirma a ação e valida o texto
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')

    })

    it('todos os campos são obrigatórios', () => {

        const student = students.required

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Nome completo', 'Nome é obrigatório')
        studentPage.alertMessage('E-mail', 'O email é obrigatório')
        studentPage.alertMessage('Idade', 'A idade é obrigatória')
        studentPage.alertMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.alertMessage('Altura', 'A altura é obrigatória')

    })

    it('tentar cadastrar um aluno menor de 16 anos', () => {
        const student = students.invalid_age

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Idade', 'A idade mínima para treinar é 16 anos!')
    })

    it.skip('tentar cadastrar informando peso incorreto', () => {
        const student = students.invalid_weight

        // cy.task('deleteStudent', student.email)
        cy.deleteStudent(student.email) //Custom command criada após mover as tasks para app.js

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Peso (em kg)', 'O peso deve ser maior do que 0!')

    })

    it.skip('tentar cadastrar informando altura incorreta', () => {
        const student = students.invalid_height

        cy.task('deleteStudent', student.email)

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.alertMessage('Altura', 'A altura deve ser maior do que 0!')

    })

})
