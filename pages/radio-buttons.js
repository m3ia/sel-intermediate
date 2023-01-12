const { Browser, By, Key, until } = require("selenium-webdriver");

const url = 'http://crossbrowsertesting.github.io/selenium_example_page.html';

class RadioBtnPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = {
      formResults: By.id('form-results'),
      submit: By.id('submitbtn'),
      // In the code for the radio btns in our browser,
      // we can see that they're <input> elements with a
      // "type" attribute of "radio". Now we can write a
      // locator for them.
      // the radioButtons locator will use a CSS selector to find all
      // <input> elements that have a "type" attribute of "radio".
      radioButtons: By.css('input[type="radio"]'),
    }
  }

  open() {
    this.driver.get(url);
  }

  // The method that clicks on the targeted radio button.
  // We take the button's value as a parameter and
  // find the radio button based on that.
  async clickRadioButton(value) {
    // We'll take the page object's driver...
    await this.driver
      // call findElement with a CSS locator. In our selector
      // we use multiple square brackets to match multiple attributes.
      // We're looking for an <input> element whose "type" attriute
      // is "radio" and whose "value" attribute matches the value
      // passed in to this clickRadioButton() method.
      .findElement(By.css('input[type="radio"][value="' + value + '"]'))
      // Take whatever element we found and call its click() method
      .click();
  }

  // Find the submit button and click on it:
  async submit(value) {
    await this.driver.findElement(this.locators.submit).click();
  }
}

module.exports = RadioBtnPage;