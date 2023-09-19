import "./commands";
import "cypress-file-upload";
// import img from '../fixtures/test.jpg';

describe("1. 게시물 업로드", () => {
  before(() => {
    cy.visit("localhost:9000/");
  });

  it("CREATE", () => {
    cy.login("sjhong98@icloud.com", "mango");
    cy.contains("게시물 올리기").click();
    // 게시물 업로드
    const imagePath = "test.jpg";
    cy.fixture(imagePath, null).then((fileContent) => {
      cy.get('[data-cy="file-upload"]').attachFile({
        fileContent: fileContent,
        fileName: "test.jpg",
      });
    });
    cy.get('[data-cy="location-select"]').click();
    cy.get('[data-cy="seoul"]').click();
    cy.get('[data-cy="title-input"]').type("create-test");
    cy.get('[data-cy="content-input"]').type("create-test");
    cy.contains("업로드").click();
    cy.log("===== 업로드 테스트 통과 =====");
  });
});
