import { Locator, Page } from "@playwright/test";

export class NotesAppPage {
  readonly page: Page;
  readonly addNewNoteButton: Locator;
  readonly searchBar: Locator;
  readonly logoTitle: Locator;
  readonly logoutButton: Locator;
  readonly navbarToggler: Locator;
  // readonly showAllCategories: Locator;
  // readonly showHomeCategory: Locator;
  // readonly showWorkCategory: Locator;
  // readonly showPersonalCategory: Locator;

  returnCategorySelector(category: string) {
    return `button[data-testid="category-${category}"]`;
  }

  constructor(page: Page) {
    this.page = page;
    this.logoTitle = page.locator(`[data-testid="home"]`);
    this.addNewNoteButton = page.locator(`button[data-testid="add-new-note"]`);
    this.searchBar = page.locator(`input[data-testid="search-input"]`);
    this.logoutButton = page.locator(`button[data-testid="logout"]`);
    this.navbarToggler = page.locator(".App button.navbar-toggler");
  }

  async getLogoTitle() {
    return this.logoTitle;
  }

  async addNewNote() {
    await this.addNewNoteButton.click();
  }

  async getSearchBar() {
    return this.searchBar;
  }

  async getCategorySelectButton(category: string) {
    return this.page.locator(this.returnCategorySelector(category));
  }

  async getLogoutButton() {
    return this.logoutButton;
  }

  async getNavbarToggler() {
    return this.navbarToggler;
  }

  async selectCategory(category: string) {
    await this.page.locator(this.returnCategorySelector(category)).click();
  }
}
