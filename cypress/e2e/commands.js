Cypress.Commands.add('login', (id, pw) => {
    cy.contains("Sign In").click(); 
    cy.get('[data-cy="login-id"]').type('sjhong98@icloud.com');
    cy.get('[data-cy="login-pw"]').type('mango');
    cy.get('.css-1lm3qma-MuiButtonBase-root-MuiButton-root').click();
})