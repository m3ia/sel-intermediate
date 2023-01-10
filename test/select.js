// This test loads the usual modules, including the 
// page object class SelectPage, builds a driver and 
// page object, and loads the page.
const { Browser, By, Key, until } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');
const assert = require('assert');
const SelectPage = require('../pages/select');

suite(function (env) {
  describe('Dropdown', function () {
    let driver;
    let page;

    before(async function () {
      driver = await env.builder().build();
      page = new SelectPage(driver);
      await page.open();
    });

    // Tests to ensure the status text gets updated when we 
    // select an item from the dropdown.
    it('Updates status text', async function () {
      // If we right-click the drop-down and choose Inspect, we'll see
      // its HTML code. It has several option elements,
      // each of which has the plain text shown to users and a
      // "value" attribute that holds the actual data that gets submitted with the form.
      // We set up a clickOption method in the page object with the value
      // "option 3" as the one it should click on.
      await page.clickOption('option3');
      // Add another method to the page object called submit() which submits the form.
      await page.submit();
      // Form submits, text of the form results should update with
      // drop-down value. We use driver's findElement() method to find that form results element
      let results = await driver.findElement(page.locators.formResults);
      let text = await results.getText();
      // Assert that the text includes the value of the drop-down option we selected.
      assert(text.includes('option3'));
    });
    after(async function () {
      driver.quit();
    });
  });
});