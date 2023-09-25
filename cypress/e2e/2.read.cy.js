import "./commands";

// board/profile/search에서 각각 잘 찾아지는가

describe("2. 게시물 확인", () => {
  beforeEach(() => {
    cy.visit("https://dyz.co.kr/");
    cy.login("sjhong98@icloud.com", "mango");
  });

  it("READ(board)", () => {
    // /board/seoul로 이동
    cy.visit("https://dyz.co.kr/board/seoul");
    cy.readPost();
    cy.log("===== board read 테스트 통과 =====");
  });

  it("READ(profile)", () => {
    cy.get(".bar > img").click();
    cy.readPost();
    cy.log("===== profile read 테스트 통과 =====");
  });

  it("READ(search)", () => {
    cy.wait(1500);
    cy.get('[data-cy="search"]').type("test");
    cy.get('[data-cy="search-btn"]').click();
    cy.readPost();
    cy.log("===== search read 테스트 통과 =====");
  });
});
