import { Locator, Page } from "@playwright/test";

export class NotesLoginPage {
  readonly page: Page;
  readonly appHeader: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly alertMessageElement: Locator;
  readonly emailInvalidFeedback: Locator;

  pageUrl = "https://practice.expandtesting.com/notes/app/login";
  email = process.env.EMAIL || "";
  password = process.env.PW || "";

  constructor(page: Page) {
    this.page = page;
    this.appHeader = page.locator(".App .container h1");
    this.emailField = page.locator(`input[data-testid="login-email"]`);
    this.passwordField = page.locator(`input[data-testid="login-password"]`);
    this.loginButton = page.locator(`button[data-testid="login-submit"]`);
    this.alertMessageElement = page.locator(`[data-testid="alert-message"]`);
    this.emailInvalidFeedback = page.locator(
      `input[data-testid="login-email"] + .invalid-feedback`
    );
  }

  async goto() {
    await this.page.goto(this.pageUrl);
  }

  async getAppHeader() {
    return await this.appHeader.innerText();
  }

  async fillEmailField(email: string) {
    await this.emailField.fill(email);
  }

  async fillPasswordField(password: string) {
    await this.passwordField.fill(password);
  }

  async loginSubmit() {
    await this.loginButton.click();
  }

  async getEmailInvalidFeedbackMessage() {
    return this.emailInvalidFeedback.innerText();
  }

  async loginWithExistingAccount() {
    await this.emailField.fill(this.email);
    await this.passwordField.fill(this.password);
    await this.loginButton.click();
  }

  async loginWithCorrectEmailButIncorrectPassword() {
    await this.emailField.fill(this.email);
    await this.passwordField.fill("Randos");
    await this.loginButton.click();
  }

  async loginWithIncorrectEmailButCorrectPassword() {
    await this.emailField.fill("randos@gmail.com");
    await this.passwordField.fill(this.password);
    await this.loginButton.click();
  }

  async getAlertMessageElement() {
    return this.alertMessageElement;
  }

  async getAlertMessage() {
    return (await this.getAlertMessageElement()).innerText();
  }
}
