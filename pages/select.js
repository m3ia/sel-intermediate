// This page object class has all the setup code we're used to seeing by now.
const { Browser, By, Key, until } = require('selenium-webdriver');

const url = "http://crossbrowsertesting.github.io/selenium_example_page.html";

class SelectPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = {
      // Locator the finds the drop-down by its ID
      dropDown: By.id('dropdown'),
      // Locator that finds the form results section
      formResults: By.id('form-results'),
      // Locator the finds the button to submit the form
      submit: By.id('submitbtn'),
    }
  }

  open() {
    this.driver.get(url);
  }

  // Method to select an option from the drop-down.
  // clickOption() takes a string parameter with the value attribute of the option it should look for.
  async clickOption(value) {
    // Find the drop-down element:
    await this.driver.findElement(this.locators.dropDown)
      // Call findElement()on the drop-down element to locate the 
      // child elements of the drop-down element.
      // Find the <option> element whose "value" attribute
      // matches the value we passed in to the clickOption() method.
      .findElement(By.css('[value=' + value + ']'))
      // Finally, if a matching option is found, we call its click() 
      // method to simulate clicking on it with the mouse to select it.
      .click();
  }

  // We also need a method that will submit the form:
  async submit(value) {
    // Use locator to find the submit btn and call 
    // its click() method to click it.
    await this.driver.findElement(this.locators.submit).click();
  }
}

module.exports = SelectPage;