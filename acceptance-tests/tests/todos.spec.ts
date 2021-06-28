describe('Todos', () => {
    it('should show empty todos', () => {
        cy.visit('/todos');

        cy.findByLabelText('empty todos').should('be.visible');
    });
});