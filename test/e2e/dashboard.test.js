import "babel-polyfill"

import chai from "chai"
chai.should()

const appUrl = process.env.APP_URL || "http://localhost:3001"

describe("Dashboard landing", () => {

  it("Should has Scraam for title", async() => {

    browser.get(appUrl)

    const title = await browser.getTitle()
    title.should.be.equal("Scraam")
  
  });

})
