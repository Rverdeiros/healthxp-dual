
import popup from './components/Popup'

class LoginPage {

    constructor(){
        this.popup = popup
    }

    go() {
        cy.visit('/')
    }

    fill(user) {
        
        //Definindo um ALIAS para os elementos referentes aos campos
        cy.get('input[name=email]').clear({ force : true}).as('email')
        cy.get('input[name=password]').clear({ force : true}).as('password')

        //Formato de IF ternário mais "profissional"
        //Não usamos o comando IF. A condição é passada através da interrogação, seguida do comando caso positivo e o comando caso negativo vem após os dois pontos.
        user.email ? cy.get('@email').type(user.email) : cy.log('empty email')
        user.password ? cy.get('@password').type(user.password) : cy.log('empty email')

        // IF Tradicional

        // if (user.email) {
        //     cy.get('@email]')
        //     .clear()
        //     .type(user.email)
        // }
        // if (user.password) {
        //     cy.get('@password')
        //     .clear({ force : true}) //O force true garante que o comando será executado
        //     .type(user.password)
        // }
    }
    
    submit() {
        cy.contains('button', 'Entrar').click()
    }
    
    doLogin(user) {
        this.go()
        this.fill(user)
        this.submit()
    }
}

//Exportação instanciando a classe LoginPage
export default new LoginPage()
