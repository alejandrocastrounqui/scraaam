import "babel-polyfill"

import chai from "chai"
chai.should()

const appUrl = process.env.APP_URL || "http://localhost:3001"

describe("Dashboard landing", () => {

  it("Should has Scraam for title", async() => {

    browser.get(appUrl)

    const title = await browser.getTitle()
    title.should.be.equal("Scraam")

    // const cantidadOriginal = await element.all(by.css("postlist post")).count()
    //
    // await browser.takeScreenshot()
    //
    // element(by.css("newpost input[name=title]")).sendKeys("Noticia extra extra!")
    // element(by.css("newpost textarea[name=content]")).sendKeys("Este es el cuerpo de la noticia")
    // await element(by.css("newpost button")).click()
    //
    // const cantidad = await element.all(by.css("postlist post")).count()
    // cantidad.should.be.equal(cantidadOriginal + 1)
  });

})
