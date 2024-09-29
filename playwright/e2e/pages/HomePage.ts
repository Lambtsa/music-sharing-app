import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  page: Page;
  /* Header */
  header: Locator;
  headerBtn: Locator;
  logo: Locator;
  /* Toggle */
  themeToggle: Locator;
  themeToggleInput: Locator;
  themeToggleLabel: Locator;
  themeToggleIconLight: Locator;
  themeToggleIconDark: Locator;
  /* Main */
  homeTitle: Locator;
  homeSubtitle: Locator;
  /* Form */
  homeForm: Locator;
  homeInputTrack: Locator;
  homeInputArtist: Locator;
  homeInputUrl: Locator;
  homeFormSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;

    /* Header */
    this.header = page.getByTestId('header--wrapper-div');
    this.headerBtn = page.getByTestId('header-logo-button');
    this.logo = page.getByTestId('header-logo-svg');

    /* Toggle */
    this.themeToggle = page.getByTestId('theme-toggle-form');
    this.themeToggleInput = page.getByRole('checkbox');
    this.themeToggleLabel = page.getByTestId('theme-toggle-label');
    this.themeToggleIconLight = page.getByTestId('theme-toggle-icon-light');
    this.themeToggleIconDark = page.getByTestId('theme-toggle-icon-dark');

    /* Main */
    this.homeTitle = page.getByTestId('home-title');
    this.homeSubtitle = page.getByTestId('home-subtitle');

    /* Form */
    this.homeForm = page.getByTestId('home-form');
    this.homeInputTrack = page.getByTestId('home-input-track');
    this.homeInputArtist = page.getByTestId('home-input-artist');
    this.homeInputUrl = page.getByTestId('home-input-url');
    this.homeFormSubmitButton = page.getByTestId('home-form-submit-button');
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

}