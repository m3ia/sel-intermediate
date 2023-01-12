const { Browser, By, Key, until } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const assert = require("assert");
const ButtonsPage = require("../pages/buttons");

suite(function (env) {
  describe('Save button', function () {
    let driver;
    let page;

    before(async function () {
      driver = await env.builder().build();
      page = new ButtonsPage(driver);
      await page.open();
    });

    // The test will ensure that the status text gets updated when we click save:
    it("Updates status text", async function () {
      await page.clickSave();
      // Locate the span element that shows the status
      let span = await driver.findElement(page.locators.status);
      let text = await span.getText();
      assert(text.includes("Saved!"));
    });

    after(async function () {
      driver.quit();
    });
  });
});