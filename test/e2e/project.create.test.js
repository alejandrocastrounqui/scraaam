import "babel-polyfill"

import chai from "chai"
chai.should()

const appUrl = process.env.APP_URL || "http://localhost:3001"

describe("project creation", () => {

  it("Should increment project amount when create new", async() => {

    const ec = protractor.ExpectedConditions;

    browser.get(appUrl)
    const beforeDropDown  = element(by.css(".projects-menu .dropdown-toggle"))
    browser.wait(ec.elementToBeClickable(beforeDropDown), 20000);
    await beforeDropDown.click()
    const beforeCreate = await element.all(by.css(".projects-menu .project-item")).count()
    await element(by.css(".projects-menu .create-project")).click()
    await element(by.css("local-project-create-modal input[name=name]")).sendKeys("nuevo proyecto " + new Date())
    await element(by.css("local-project-create-modal .modal-create")).click()

    browser.get(appUrl)
    const afterDropDown  = element(by.css(".projects-menu .dropdown-toggle"))
    browser.wait(ec.elementToBeClickable(afterDropDown), 20000);
    await afterDropDown.click()

    await element(by.css(".projects-menu .dropdown-toggle")).click()
    const afterCreate = await element.all(by.css(".projects-menu .project-item")).count()
    afterCreate.should.be.equal(beforeCreate + 1)

  });



})
