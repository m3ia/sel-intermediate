const { Browser, By, Key, until } = require("selenium-webdriver");
const url = 'https://treehouse-projects.github.io/selenium-webdriver-intermediate/byjs/app/';

class ButtonsPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = {
      // We can locate the "status" span by its ID:
      status: By.id('status'),
      // Locator for the Save btn:
      // Pass in a callback fxn to By.js() return the element you want to select
      saveButton: By.js(function () {
        // "document" object represents the web page. Has a getElementByTagName() method 
        // which we use to find all the <button> elements:
        let buttons = document.getElementsByTagName('button');
        // Use a "for" loop to loop over the array to find the button we want:
        for (index = 0; index < buttons.length; ++index) {
          // Test whether the current btn has text content of "Save":
          if (buttons[index].textContent === "Save") {
            // Return that element from the function which becomes the result of the By.js locator:
            return buttons[index];
          }
        }
      }),
    }
  }

  open() {
    this.driver.get(url);
  }

  // Add a clickSave() method to click Save button
  async clickSave() {
    var button = await this.driver.findElement(this.locators.saveButton);
    await button.click();
  }
}

module.exports = ButtonsPage;