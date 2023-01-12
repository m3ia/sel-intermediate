const { Browser, By, Key, until } = require("selenium-webdriver");
const { suite } = require("selenium-webdriver/testing");
const assert = require("assert");
const RadioBtnPage = require("../pages/radio-buttons");

suite(function (env) {
    describe('Radio buttons', function() {
        let driver;
        let page;

        before(async function() {
            driver = await env.builder().build();
            page = new RadioBtnPage(driver);
            await page.open();
        });

    // I'll add a test to this suite to ensure the radio buttons update
        // the status text.
        it('update status text', async function() {
            // Let's go back to our browser, and right-click on our form to
            // inspect it. We can see the code for the radio buttons here
            // inside the form. Just like the options for the drop-down
            // element, each radio button has a "value" attribute that
            // provides the string that will be included in the form data
            // when it's submitted: "radio1" or "radio2".
            // I'll call a method called clickRadioButton() that we'll define
            // on our page object. I'll pass it the value of the radio button
            // that I want it to click.
            await page.clickRadioButton('radio2');
            // Then we'll call a submit() method that we're also going to
            // define on our page object, which will click the submit button
            // for us.
            await page.submit();
            // The rest of this test's code will look just like the code from
            // the drop-down selection video. First, we find the form results
            // element.
            let results = await driver.findElement(page.locators.formResults);
            // Then, we get its text.
            let text = await results.getText();
            // And finally, we assert that the text includes the value of the
            // radio button we selected.
            assert(text.includes("radio2"));
        });

        after(async function() {
            driver.quit();
        });
    });
});