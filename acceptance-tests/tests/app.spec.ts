describe('App', () => {
    it('should load settings', () => {
        cy.visit('/');
        cy.findByLabelText('welcome').should('contain.text', 'Welcome');
    })
})