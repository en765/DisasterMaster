const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('geckodriver');

(async function testLeafletMap() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Load the webpage where your React app is running
        await driver.get('http://localhost:3000');  // Adjust with your local URL or deploy URL

        // Wait for the map container to be present
        const mapDisplayed = await driver.wait(until.elementLocated(By.id('homepage-map')), 10000);
        console.log('Map is displayed:', mapDisplayed != null);

        // Wait for the "AddWeatherReports" button (adjust selector as needed)
        const addWeatherReportsButton = await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
        await addWeatherReportsButton.click();  // Click to open the weather report options
        console.log('AddWeatherReports button clicked, list of reports shown.');

        // ----------- Test for Earthquake ----------- 
        // Wait for the Earthquake icon to appear
        const earthquakeIcon = await driver.wait(until.elementLocated(By.xpath("//li[text()='🌍 Earthquake']")), 10000);
        console.log('Earthquake icon found.');
        await earthquakeIcon.click();  // Click on Earthquake

        // Wait for the WeatherReportForm to load (check if form is visible)
        await driver.wait(until.elementLocated(By.className('weather-report-form')), 10000);
        console.log('Weather report form loaded for Earthquake.');

        // Fill out the form for Earthquake
        await driver.findElement(By.xpath("//input[@placeholder='Enter location']")).sendKeys('London');
        await driver.findElement(By.xpath("//textarea[@placeholder='Describe the situation']")).sendKeys('Severe earthquake in London');
        await driver.findElement(By.xpath("//button[text()='Submit']")).click();  // Submit the form

        // Wait for the form to be closed and return to the main page
        await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
        console.log('Returned to the main page.');

        // ----------- Test for Fire ----------- 
        // Click the "AddWeatherReports" button again
        await addWeatherReportsButton.click();  // Open the weather report options
        console.log('AddWeatherReports button clicked again, list of reports shown.');

        // Wait for the Fire icon and click it
        const fireIcon = await driver.wait(until.elementLocated(By.xpath("//li[text()='🔥 Fire']")), 10000);
        console.log('Fire icon found.');
        await fireIcon.click();  // Click on Fire

        // Wait for the WeatherReportForm to load (check if form is visible)
        await driver.wait(until.elementLocated(By.className('weather-report-form')), 10000);
        console.log('Weather report form loaded for Fire.');

        // Fill out the form for Fire
        await driver.findElement(By.xpath("//input[@placeholder='Enter location']")).sendKeys('California');
        await driver.findElement(By.xpath("//textarea[@placeholder='Describe the situation']")).sendKeys('Massive fire in California');
        await driver.findElement(By.xpath("//button[text()='Submit']")).click();  // Submit the form

        // Wait for the form to be closed and return to the main page
        await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
        console.log('Returned to the main page.');

        // ----------- Test for Flood ----------- 
        // Click the "AddWeatherReports" button again
        await addWeatherReportsButton.click();  // Open the weather report options
        console.log('AddWeatherReports button clicked again, list of reports shown.');

        // Wait for the Flood icon and click it
        const floodIcon = await driver.wait(until.elementLocated(By.xpath("//li[text()='🌊 Flood']")), 10000);
        console.log('Flood icon found.');
        await floodIcon.click();  // Click on Flood

        // Wait for the WeatherReportForm to load (check if form is visible)
        await driver.wait(until.elementLocated(By.className('weather-report-form')), 10000);
        console.log('Weather report form loaded for Flood.');

        // Fill out the form for Flood
        await driver.findElement(By.xpath("//input[@placeholder='Enter location']")).sendKeys('Miami');
        await driver.findElement(By.xpath("//textarea[@placeholder='Describe the situation']")).sendKeys('Severe flooding in Miami');
        await driver.findElement(By.xpath("//button[text()='Submit']")).click();  // Submit the form

        // Wait for the form to be closed and return to the main page
        await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
        console.log('Returned to the main page.');

        // ----------- Test for Storm ----------- 
        // Click the "AddWeatherReports" button again
        await addWeatherReportsButton.click();  // Open the weather report options
        console.log('AddWeatherReports button clicked again, list of reports shown.');

        // Wait for the Storm icon and click it
        const stormIcon = await driver.wait(until.elementLocated(By.xpath("//li[text()='🌩️ Storm']")), 10000);
        console.log('Storm icon found.');
        await stormIcon.click();  // Click on Storm

        // Wait for the WeatherReportForm to load (check if form is visible)
        await driver.wait(until.elementLocated(By.className('weather-report-form')), 10000);
        console.log('Weather report form loaded for Storm.');

        // Fill out the form for Storm
        await driver.findElement(By.xpath("//input[@placeholder='Enter location']")).sendKeys('New York');
        await driver.findElement(By.xpath("//textarea[@placeholder='Describe the situation']")).sendKeys('Severe storm in New York');
        await driver.findElement(By.xpath("//button[text()='Submit']")).click();  // Submit the form

        // Wait for the form to be closed and return to the main page
        await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
        console.log('Returned to the main page.');

    } catch (error) {
        console.log('Test failed due to error: ' + error);
        assert.fail('Test failed due to error: ' + error);
    } finally {
        await driver.quit();
    }
})();
