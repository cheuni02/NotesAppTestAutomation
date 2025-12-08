import { Locator, Page } from "@playwright/test";

export class NotesAppHome {
  readonly page: Page;
  readonly appTitle: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appTitle = page.locator(".App .container h1");
    this.loginButton = page.locator(`a[href="/notes/app/login"]`);
  }

  async getUrl() {
    return this.page.url();
  }

  async getNotesAppTitle() {
    return this.appTitle.innerText();
  }

  async getloginButton() {
    return this.loginButton;
  }
}
