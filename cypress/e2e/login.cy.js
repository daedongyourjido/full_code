describe('login-upload', () => {
  before(() => {
    cy.visit('localhost:3000/');
  });

  it('2. 로그인', () => {
    cy.contains("Sign In").click(); 
  })
})