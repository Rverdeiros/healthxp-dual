const login = require("./screens/login")

Feature('home') //Feature é como o describe do cypress

//Scenario é como o it do cypress
Scenario('testando o app',  ({ I, loginScreen }) => { // "I" é usado antes dos comandos, como cy no cypress. "loginPage é a referência do pageObject"

    //Chamando a função submit que está na página loginPage e passando o argumento enrollmentCode
    loginScreen.submit('ON3JOV')

    //Validando que o login foi feito com sucesso.
    I.see('Minha conta') //Valida que o texto Minha conta está visível, confirmando o login

})

Scenario('nao deve logar com matrícula incorreta', ({loginScreen})=>{

    loginScreen.submit('XPTO123')

    const message = 'Acesso não autorizado! Entre em contato com a central de atendimento.'
    loginScreen.messageHaveText(message)
})
