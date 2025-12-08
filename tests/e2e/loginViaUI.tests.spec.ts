import { test, expect } from "@playwright/test";
import { NotesLoginPage, NotesAppPage, NotesAppHome } from "../../pages";

let loginPage: NotesLoginPage;
let notesPage: NotesAppPage;
let notesHomepage: NotesAppHome;

test.beforeEach(async ({ page }) => {
  loginPage = new NotesLoginPage(page);
  notesPage = new NotesAppPage(page);
  notesHomepage = new NotesAppHome(page);
  await loginPage.goto();
  expect(await loginPage.getAppHeader()).toContain("Login");
});

test.describe(
  "logging in with valid existing creds",
  {
    tag: ["@login", "@positive"]
  },
  () => {
    test.beforeEach(async () => {
      await loginPage.loginWithExistingAccount();
    });

    test("Displays MyNotes app with Notes app logo, search bar, and filter buttons for all notes categories", async () => {
      await expect(await notesPage.getLogoTitle()).toBeVisible();
      await expect(await notesPage.getSearchBar()).toBeVisible();
      const categoryList: string[] = ["all", "home", "work", "personal"];
      for (const category of categoryList) {
        await expect(
          await notesPage.getCategorySelectButton(category.toLowerCase())
        ).toBeVisible();
      }
    });

    test('Can logout using "logout" button on a browser with width 1500px, which will return me to /notes/app', async ({
      page
    }) => {
      await page.setViewportSize({ width: 1500, height: 500 });
      await expect(await notesPage.getLogoutButton()).toBeVisible();
      await (await notesPage.getLogoutButton()).click();
      await expect(page).toHaveTitle(
        "Notes React Application for Automation Testing Practice"
      );
      expect(await notesHomepage.getNotesAppTitle()).toContain(
        "Welcome to Notes App"
      );
      expect(await notesHomepage.getUrl()).toContain("/notes/app");
    });

    test("Can login via the burger navbar-toggler if mobile widths", async ({
      page
    }) => {
      await page.setViewportSize({ width: 400, height: 500 });
      const navbar = await notesPage.getNavbarToggler();
      await expect(navbar).toBeVisible();
      await navbar.click();
      await (await notesPage.getLogoutButton()).click();
      expect(await notesHomepage.getNotesAppTitle()).toContain(
        "Welcome to Notes App"
      );
      expect(await notesHomepage.getUrl()).toContain("/notes/app");
    });
  }
);

test.describe(
  "logging in with incorrect creds",
  {
    tag: ["@login", "@negative"]
  },
  () => {
    test("logging in with correct email but wrong password will be rejected", async () => {
      await loginPage.loginWithCorrectEmailButIncorrectPassword();
      expect(await loginPage.getAlertMessage()).toContain(
        "Incorrect email address or password"
      );
    });

    test("logging in with wrong email but correct password will be rejected", async () => {
      await loginPage.loginWithIncorrectEmailButCorrectPassword();
      expect(await loginPage.getAlertMessage()).toContain(
        "Incorrect email address or password"
      );
    });

    test("validation message appears when email address format not correct", async () => {
      for (const testStr of ["dfdfsd", "fred@", "juniper@foo"]) {
        await loginPage.fillEmailField(testStr);
        await loginPage.loginSubmit();
        expect(await loginPage.getEmailInvalidFeedbackMessage()).toContain(
          "Email address is invalid"
        );
      }
    });

    test("invalid format validation message disappears when email address format correct", async () => {
      for (const testStr of ["juniper@foo.go"]) {
        await loginPage.fillEmailField(testStr);
        await loginPage.loginSubmit();
        expect(await loginPage.getEmailInvalidFeedbackMessage()).toContain("");
      }
    });
  }
);
