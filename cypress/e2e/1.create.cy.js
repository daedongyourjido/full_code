import './commands';
import 'cypress-file-upload';

describe('1. 게시물 업로드', () => {
  before(() => {
    cy.visit('localhost:3000/');
  });

  it('CREATE', () => {
    cy.login('sjhong98@icloud.com', 'mango');
    cy.contains("게시물 올리기").click(); 
    // 게시물 업로드
    const imagePath = 'test.jpg';
    cy.fixture(imagePath, null).then(fileContent => {
      cy.get('[data-cy="file-upload"]').attachFile({
        fileContent: fileContent,
        fileName: 'test.jpg',
      });
    })
    cy.get('[data-cy="location-select"]').click();
    cy.get('[data-cy="seoul"]').click();
    cy.get('[data-cy="title-input"]').type('test');
    cy.get('[data-cy="content-input"]').type('test');
    cy.contains('업로드').click();
    cy.get(':nth-child(1) > .post-thumbnail').click();
    cy.get('.detail > h3').invoke('text').then((uploadedPostContent) => {
      expect(uploadedPostContent.trim()).to.equal("test");
      cy.log("upload test passed")
    });
    cy.get('.detail > p').invoke('text').then((uploadedPostContent) => {
      expect(uploadedPostContent.trim()).to.equal("test");
      cy.log("upload test passed")
    });

  })
})