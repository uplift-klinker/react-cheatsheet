describe('Welcome', () => {
    it('should show welcome message', () => {
        cy.visit('/welcome');
        cy.findByLabelText('welcome').should('contain.text', 'Welcome');
    });
});