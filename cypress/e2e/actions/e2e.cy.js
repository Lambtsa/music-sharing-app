/// <reference types="cypress" />
import translations from "../../../src/locales/en-UK.json";

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Audiolinx", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("https://localhost:3000/");
  });

  /* ############################## */
  /* Jumbotron */
  /* ############################## */
  it("displays a title and a subtitle", () => {
    /* TODO: See if we can check that the element is h1 */
    // cy.get("[data-test=title]").should("be.instanceOf", "h1")

    /*  */
    cy.get("[data-test=title]").should("have.text", translations["home.title"]);
    cy.get("[data-test=subtitle").should(
      "have.text",
      translations["home.subtitle"]
    );
  });

  /* https://on.cypress.io/selecting-elements */
  it("can search for artists", () => {
    /* Enter search text in the search field */
    cy.get("[data-test=search-input]").type("Guns n roses");
    /* Select correct search type */
    cy.get("[data-test=selector-artist]").click();
    /* Submit the form */
    cy.get("[data-test=submit]").click();

    /* Wait for the request to be finished */

    cy.intercept("POST", "http://localhost:8080/api/tracks").as("getTracks");

    // cy.wait("@getTracks")
    //   .its('response.statusCode').should('equal', 200);

    cy.get("[data-test=album-button]")
      .should("have.length.above", 1)
      .first()
      .children("div[data-test=album-inner-container]")
      .children("p[data-test=album-title]")
      .should("have.text", "Appetite For Destruction");

    cy.get("[data-test=album-button]")
      .should("have.length.above", 1)
      .first()
      .children("div[data-test=album-inner-container]")
      .children("h3[data-test=album-artist]")
      .should("have.text", "Guns N' Roses");
  });

  it("url should trigger url selection", () => {
    /* Select correct artist search type */
    cy.get("[data-test=selector-artist]").click();
    /* Artist should now be selected */
    cy.get("[data-test=selector-artist]").should(
      "have.css",
      "background-color",
      "rgb(60, 187, 177)"
    );
    /* Enter search text in the search field */
    cy.get("[data-test=search-input]").type(
      "https://open.spotify.com/track/2RUhtNBh43RtSg0WBPPq3m"
    );
    /* Url should now be selected */
    cy.get("[data-test=selector-url]").should(
      "have.css",
      "background-color",
      "rgb(60, 187, 177)"
    );
    /* Artist should now not be selected */
    cy.get("[data-test=selector-artist]").should(
      "have.css",
      "background-color",
      "rgba(255, 254, 237, 0.2)"
    );
  });
});
