describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('http://localhost:3000')
    cy.title().should('be.equal', 'Health eXperience | Exclusivo para treinamentos na QAx')
  })
})