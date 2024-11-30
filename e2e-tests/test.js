const { Builder, By, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");

describe("E2E Test", function () {
  this.timeout(30000);
  let driver;

  beforeEach(async function () {
    let options = new firefox.Options().addArguments("--headless");
    driver = new Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(options)
      .build();
    driver.manage().setTimeouts({ implicit: 10000 });
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Should add a task", async function () {
    console.log("Navigating to the page......");
    await driver.get("http://localhost:3001/");
    console.log("Page loaded, resizing window...");
    await driver.manage().window().setRect({ width: 1510, height: 871 });
    await driver.sleep(10000); // Add a 5-second delay

    console.log("Waiting for input element...");
    const input = await driver.wait(until.elementLocated(By.css("input")), 20000);
    console.log("Input element located, clicking...");
    await input.click();
    console.log("Sending keys...");
    await input.sendKeys("this is a task");

    console.log("Finding add button...");
    const addButton = await driver.findElement(By.css("button:nth-child(2)"));
    console.log("Clicking add button...");
    await addButton.click();
    console.log("Task added.");
  });
});
