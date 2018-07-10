it('meets all standards', () => {
    cy.visit('http://localhost:3000/'),
    cy.get('#reviews-header .ui.button').click()
})