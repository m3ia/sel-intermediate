const {Browser, By, Key, until} = require("selenium-webdriver");
// Library that integrates with the Mocha testing framework
const { suite } = require("selenium-webdriver/testing");
// assert library lets us assert that tests are what they're supposed to be
const assert = require("assert");
// 
const { describe, it } = require("node:test");

// call the suite method - expects a function callback - accepts a test env.
suite(function (env) {
  // method that allows us to describe the test: 
  // 1st arg = a string for the description,
  // 2nd arg = callback function that contains all our tests
  describe('RSVP site', function () {
    // "it" describtes what our site should do
    it('has invitee list', function () {
      // should return false.
      assert(1 === 2);
    });
  });
});

// ^^ run "mocha" in the terminal to run test