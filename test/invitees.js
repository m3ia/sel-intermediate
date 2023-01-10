const {Browser, By, Key, until} = require("selenium-webdriver");
// Library that integrates with the Mocha testing framework -- allows us to automatically run tests for each browser driver installed: Chrome, Firefox, Safari for me
const {suite} = require("selenium-webdriver/testing");
// assert library lets us assert that tests are what they're supposed to be
const assert = require("assert");
// Load the RsvpPage class
const RsvpPage = require("../pages/rsvp.js");

// We set up this sample app on a public web server for your convenience.
// But when you're testing your own apps, you'll probably want to install it on the same
// computer where you're running your tests, so that you can connect to "localhost"
// and not have your tests slowed down by network delays.
const url =
  "https://treehouse-projects.github.io/selenium-webdriver-intermediate/waits/app/index.html";

// const { describe, it } = require("node:test");

// call the suite method - expects a function callback - accepts a test env.
suite(function (env) {
  // method that allows us to describe the test:
  // 1st arg = a string for the description,
  // 2nd arg = callback function that contains all our tests
  describe("RSVP site", function () {
    // "it" describtes what our site should do
    it("has invitee list", function () {
      // env passed in from suite() is an object that can build web driver instances
      env
        .builder()
        .build()
        // We won't get the driver back right away. Instead, we get a PROMISE
        // that we'll EVENTUALLY get a driver. We need to call then() on
        // this promise, and pass it as a callback function that will be called when
        // the driver is available.
        .then((driver) => {
          // Get the webpage. Sincewe have to send a network request
          // for that page, again, this is something that won't complete right away.
          driver
            .get(url)
            // Again, returns a promise we need to call then() on.
            // We pass then() a function that will be called once the page
            // is retrieved.
            .then(() => driver.findElements(By.id("invitedList")))
            // findElements() returns ANOTHER promise. When the list of
            // matching elements is found, we test that it's not empty.
            .then((elements) => assert(elements.length > 0))
            // Finally, we need to tell WebDriver to exit, so it doesn't
            // leave an open browser cluttering our desktop.
            .then(() => driver.quit());
        });
    });
  });
});

// ^^ run "mocha" in the terminal to run test

suite(function (env) {
  describe("RSVP site w async + await fxns", function () {
    // In order to use the await keyword, we need to indicate this function is
    // asynchronous. We do that by adding the async keyword before the
    // function keyword.
    it("has invitee list (test via async await)", async function () {
      // Calling build() to build a driver still returns a promise. But instead
      // of calling then() on that promise, we can place the await keyword right
      // before the call that returns the promise. JavaScript will pause the
      // execution of the asynchronous function, and wait for the promise to
      // resolve. When it does, await will return the resolved promise's value,
      // that is, the new driver object. We then assign that object to a variable
      // named driver.
      let driver = env.builder().build();
      // Same idea here. get() still returns a promise, but typing await before
      // the call pauses execution until the page is retrieved and the promise
      // is resolved. In this case, we don't need to assign the promise's value
      // anywhere.
      await driver.get(url);
      // Another promise, another await keyword. When it resolves, the returned
      // list of elements is assigned to the elements variable.
      let elements = await driver.findElements(By.id("invitedList"));
      // Now we can check the list of elements to ensure it's not empty.
      assert(elements.length > 0);
      // Finally, we can tell the driver to close the browser.
      driver.quit();
    });
  });
});

suite(function (env) {
  describe('RSVP site 3 - before and after keywords', async function () {
    // Move variable definition here so it remains in scope
    let driver;

    // Call before() and pass it a callback function that will be called before each test.
    // We make our callback function asynchronous so we can await within it.
    before(async function() {
      // Move driver building here so it happens before each test
      driver = env.builder().build();
      // Need to get the page before each test too
      await driver.get(url);
    });

    // This test (and any others defined within the describe() callback) will be run after
    // before() callback, and before the after() callback.
    it('has invitee list - 3', async function () {
      // These lines are specific to this test, so we leave them here.
      let elements = await driver.findElements(By.id('invitedList'));
      assert(elements.length > 0);
    });

    // The setup code in the before() callback and the teardone code in the after()
    // callback are run before each test, so we can remove the duplicated code from this test too.
    it('has registration form - 3', async function () {
      // We leave only the code that's specific to this particular test.
      let elements = await driver.findElements(By.id('registrar'));
      assert(elements.length > 0);
    });

    // Call after() and pass it another callback function that will be called after each test.
    after(async function() {
      // Move code to close browser here, because it needs to be run after each test.
      driver.quit();
    });
  });
});

suite(function (env) {
  describe("RSVP site - 4 w/ Page Object", async function () {
    let driver;
    // Define a variable to hold the page object here so it stays in scope in all tests
    let page;

    before(async function () {
      driver = await env.builder().build();
      // Create a new page object that will use our driver object.
      // Store it in the page variable.
      page = new RsvpPage(driver);
      // Instead of calling driver.get() ourselves, we'll let the page object load the page for us
      await page.open();
    });

    it("has invitee list", async function () {
      // Use the locator from the page object instead.
      let elements = await driver.findElements(page.locators.invitedList);
      assert(elements.length > 0);
    });

    it("has registration form", async function () {
      // Use the locator from the page object instead.
      let elements = await driver.findElements(page.locators.registrationForm);
      assert(elements.length > 0);
    });

    after(async function () {
      driver.quit();
    });
  });
});
