const { I } = inject();

module.exports = {

  //Mapeando os locators para reuso. de acordo com o sistema (android ou mobile)
  locators: {
    ip: { android: '#ipAddress' },
    enrollment: { android: '#enrollment_code' },
    message: { android: '#android:id/message' }
  },
  // insert your locators and methods here

  submit(enrollmentCode) {
    //Testando se o app está instalado. O locarot é o "package"
    I.seeAppIsInstalled('com.papitorocks.healthxp')

    I.waitForElement(this.locators.ip, 5) //Espera por 5 segundos até que o elemento esteja visível
    I.fillField(this.locators.ip, '169.254.148.19') //preenchendo o campo IP com o valor do ip

    I.waitForElement(this.locators.enrollment, 5)
    I.fillField(this.locators.enrollment, enrollmentCode)

    I.tap('Entrar')//Clica no texto entrar
  },

  messageHaveText(text) {

    I.waitForElement(this.locators.message, 5)
    I.see(text, this.locators.message)

  }
}
