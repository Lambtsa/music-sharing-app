/// <reference types="cypress" />

import { NextRouter } from "next/router";

/**
 * Helper function that mocks the next/router hook.
 * @returns NextRouter
 */
export const useMockRouter = (): NextRouter => {
  return {
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    // components: {},
    isFallback: false,
    basePath: "",
    events: {
      emit: cy.spy().as("emit"),
      off: cy.spy().as("off"),
      on: cy.spy().as("on"),
    },
    push: cy.spy().as("push"),
    replace: cy.spy().as("replace"),
    reload: cy.spy().as("reload"),
    back: cy.spy().as("back"),
    prefetch: cy.stub().as("prefetch").resolves(),
    beforePopState: cy.spy().as("beforePopState"),
    isLocaleDomain: true,
    forward: cy.spy().as("forward"),
    isReady: true,
    isPreview: true,
    // locale?: string | undefined;
    // locales?: string[] | undefined;
    // defaultLocale?: string | undefined;
    // domainLocales?: DomainLocale[] | undefined;
  };
};
