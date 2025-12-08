import { test as teardown } from "@playwright/test";

teardown("global.teardown.ts", async ({}) => {
  console.log("teardown  ...");
});
