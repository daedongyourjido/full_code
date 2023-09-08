import "./commands";

// board에서 수정하는거랑 profile에서 수정하는 경우 나누기

describe("2. 게시물 수정", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/");
  });

  it("UPDATE(board에서 접근)", () => {
    cy.login("sjhong98@icloud.com", "mango");
    cy.get('[data-cy="main"]').click(1040, 220);
    cy.get(":nth-child(1) > .post-thumbnail").click();
    cy.get('[data-cy="post-update"]').click();
  });

  it("UPDATE(profile에서 접근)", () => {
    cy.login("sjhong98@icloud.com", "mango");
    cy.get(".bar > img").click();
    cy.get(":nth-child(1) > .post-thumbnail").click();
    cy.get('[data-cy="post-update"]').click();
    // destroy is not a function 에러 무시 (새로고침으로 해결)
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    // 이미지 업로드할 부분
    cy.get('[data-cy="location-select"]').click();
    cy.get('[data-cy="jeju"]').click();
    cy.get('[data-cy="title-input"]').type(" / update-test");
    cy.get('[data-cy="content-input"]').type(" / update-test");
    cy.contains("업로드").click();

    // 수정되면 이동된 게시판 맨 앞으로 가는지 확인 필요
    cy.get(":nth-child(1) > .post-thumbnail").click();

    cy.url().should("eq", "http://localhost:3000/board/jeju");

    // 이미지 업로드 테스트
    cy.get('[data-cy="post-img"]').should("be.visible");

    // title 테스트
    cy.get(".detail > h3")
      .invoke("text")
      .then((uploadedPostContent) => {
        expect(uploadedPostContent.trim()).to.equal("create-test / update-test");
      });

    // content 테스트
    cy.get(".detail > p")
      .invoke("text")
      .then((uploadedPostContent) => {
        expect(uploadedPostContent.trim()).to.equal("create-test / update-test");
      });
  });
});
