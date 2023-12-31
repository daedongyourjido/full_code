Cypress.Commands.add("login", (id, pw) => {
  cy.get('[data-cy="login-btn"]').click();
  cy.get('[data-cy="login-id"]').type(id);
  cy.get('[data-cy="login-pw"]').type(pw);
  cy.get(".css-1lm3qma-MuiButtonBase-root-MuiButton-root").click();
});

Cypress.Commands.add("readPost", () => {
  cy.get(":nth-child(1) > .post-thumbnail").click();
  // 이미지 업로드 테스트
  cy.get('[data-cy="post-img"]').should("be.visible");
  // title 테스트
  cy.get(".detail > h3")
    .invoke("text")
    .then((uploadedPostContent) => {
      expect(uploadedPostContent.trim()).to.equal("create-test");
    });
  // content 테스트
  cy.get(".detail > p")
    .invoke("text")
    .then((uploadedPostContent) => {
      expect(uploadedPostContent.trim()).to.equal("create-test");
    });
});
