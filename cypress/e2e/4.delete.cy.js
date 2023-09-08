import "./commands";

describe("2. 게시물 확인", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/");
    cy.login("sjhong98@icloud.com", "mango");
  });

  it("READ(board)", () => {
    let ImageUrl = "";
    let newImageUrl = "";

    cy.get(".bar > img").click();
    // 기존 thumbnail 저장
    cy.get(":nth-child(1) > .post-thumbnail")
      .should("be.visible")
      .then((imgElement) => {
        ImageUrl = imgElement.attr("postId");
      });
    // 삭제
    cy.get(":nth-child(1) > .post-thumbnail").click();
    cy.get('[data-cy="post-delete"]').click();
    cy.wait(2000);
    // 새로운 thumbnail 저장
    cy.get(":nth-child(1) > .post-thumbnail")
      .should("be.visible")
      .then((imgElement) => {
        newImageUrl = imgElement.attr("postId");
        expect(ImageUrl).to.not.equal(newImageUrl);
      });
    cy.log("===== 게시물 삭제 통과 =====");
  });
});
