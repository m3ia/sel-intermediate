// We load the same set of objects from the "selenium-webdriver"
// module that we did for our previous page objects.
const {Browser, By, Key, until} = require("selenium-webdriver");

// We've pasted the page URL here, for our open() function to use.
const url = 'http://scrollmagic.io/examples/advanced/infinite_scrolling.html';

// Our class definition, constructor, and open() methods look
// the same as they did for previous page objects.
class ScrollPage {
    constructor(driver) {
        this.driver = driver;
        this.locators = {
            // We need to define the locators that our test will
            // use. The "boxes" locator finds all elements with
            // a CSS class of "box1".
            boxes: By.css('.box1'),
            // And the "loader" locator finds the element with
            // an ID of "loader", so we can scroll to it.
            loader: By.id('loader'),
        }
    }

    open() {
        this.driver.get(url);
    }

    // Now we need to define the method that our test calls
    // to scroll to the loader element at the bottom of the
    // page.
    async loadContent() {
        // We start by calling findElement() on our driver object
        // to find the loader locator we defined above.
        var loader = await this.driver.findElement(this.locators.loader);
        // To scroll the page, we need to execute some
        // JavaScript on the page. We do this by calling
        // the executeScript() method on the driver. We pass
        // the JavaScript we want to run as the first
        // argument. Additional arguments to executeScript()
        // get passed as arguments to that JavaScript code.
        // So we pass it our loader element, and then have
        // the JavaScript code scroll that element into view.
        await this.driver.executeScript("arguments[0].scrollIntoView();", loader);
        // There's one more problem; the boxes don't get added
        // immediately after we scroll to the loader element.
        // If we checked for more boxes right away, they
        // wouldn't be present, and the test would fail. Luckily,
        // this demo is set up to add the "active" CSS class to the
        // loader element while it's adding new content, and remove
        // that class when it's done. So we can just add an explicit
        // wait here that waits until the loader element no longer
        // has the "active" class.
        await this.driver.wait(until.elementLocated(By.css('#loader:not(.active)')));
    }
}

module.exports = ScrollPage;