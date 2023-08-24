import users from '../fixtures/users.json'
import loginPage from "../support/pages/LoginPage"
import studentPage from "../support/pages/StudentPage"

describe('login', () => {

    it('deve logar com o perfil do admin', () => {

        //Dado que eu tenho um usuário admin cadastrado
        //Quando faço login no gestor de academias
        //Então devo ver o dashboard
        
        const user = users.admin
        loginPage.doLogin(user)

        studentPage.navbar.userLoggedIn(user.name)

    })

    it('não deve logar com senha incorreta', () => {

        //Dado que eu tenho um usuário admin cadastrado
        //Quando tento fazer login com a senha incorreta
        //Então devo ver a mensagem Suas credenciais são inválidas, por favor tente novamente

        const user = users.inv_pass
        loginPage.go()
        loginPage.fill(user)
        loginPage.submit()
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com email não cadastrado', () => {
        const user = users.email_not_found

        loginPage.go()
        loginPage.fill(user)
        loginPage.submit()
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com email incorreto', () => {
        
        const emails = users.inv_emails
        //Primeira opção, validando as mensagens após executar cada item da massa de testes:
        // login.go()

        // emails.forEach((u) => {
        //     login.fill(u)
        //     login.submit()
        //     login.haveText('Insira um email válido.')
        //     login.back()

         //Segunda opção, com validação das mensagens de erro após rodar todas as variações da massa de teste na mesma seção:
        let outputMessages = [] // Armazena a mensagem do elemento .swal2-content'
        let expectedMessages = [] // Armazena as mensagens esperadas para validação

        loginPage.go()

        emails.forEach((u) => {
            loginPage.fill(u)
            loginPage.submit()

            //Busca o elemento, invoca o texto e armazena na função t
            loginPage.popup.content()
                .invoke('text')
                .then((t) => {
                    cy.log(t)
                    outputMessages.push(t) //Adiciona o texto invocado no array da variável outputMessages
                    expectedMessages.push('Insira um email válido.') //Mensagem esperada de acordo com as regras de negócio.
                    
                })

            loginPage.popup.back()

        })
    
            cy.wrap(outputMessages).should('deep.equal', expectedMessages) //Compara o resultado das duas listas criadas
    })

    it('não deve logar com email em branco', () => {
        const user = users.empty_email

        loginPage.go()
        loginPage.fill(user)
        loginPage.submit()
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
    })

        it('não deve logar com senha em branco', () => {
            const user = users.empty_password

            loginPage.go()
            loginPage.fill(user)
            loginPage.submit()
            loginPage.popup.haveText('Os campos email e senha são obrigatórios.')
            })
})
