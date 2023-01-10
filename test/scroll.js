
// At the top, we load functions from the usual set of modules.
const {Browser, By, Key, until} = require("selenium-webdriver");
const {suite} = require("selenium-webdriver/testing");
const assert = require('assert');
// We load a ScrollPage class from the scroll.js module in the "pages"
// directory, which we'll show you in a moment.
const ScrollPage = require('../pages/scroll.js');

// We set up a test suite with driver and page objects, just as in
// previous videos.
suite(function(env) {
    describe('Infinite scroll demo', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new ScrollPage(driver);
            await page.open();
        });

        // We need to add a test to check whether more boxes get
        // added when we scroll.
        it('adds more boxes', async function() {
            // First we need to get the boxes that are already on the
            // page. We call findElements() with a locator that we'll
            // set up in the page object class, that finds all elements
            // with a CSS class of "box1". findElements returns a
            // promise, so of course we need to use the "await" keyword.
            let boxes = await driver.findElements(page.locators.boxes);
            // The result is an array of all the box elements. We get
            // the length of that array, and store it in a variable.
            // After we load more boxes, we'll get the new count and
            // compare it to this one.
            let oldBoxCount = boxes.length;
            // Let's just log the current count to the terminal so we
            // can see it. You'll want to remove any logging from the
            // final version of your test.
            console.log(oldBoxCount);
            // Remember, we're relying on the page object to actually
            // interact with the page. So we'll call a method on the
            // page object to load more content by scrolling.
            await page.loadContent();
            // After the call to loadContent() completes, there should
            // be more boxes on the page. So we make a call to 
            // findElements() that's identical to the previous one, and
            // store the new array of elements.
            boxes = await driver.findElements(page.locators.boxes);
            // Then we get the size of the array again.
            let newBoxCount = boxes.length;
            // And let's log this new count so we can see it.
            console.log(newBoxCount);
            // We end the test by asserting that there are more boxes
            // on the page now that we've loaded new content.
            assert(newBoxCount > oldBoxCount);
        });

        after(async function() {
            driver.quit();
        });
    });
});