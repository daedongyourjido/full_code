import React from "react";
import Bar from "./bar";

describe("<Bar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Bar />);
  });
});
