const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

(async function testMapInteraction() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Step 1: Maximize the browser window (make it full screen)
        await driver.manage().window().maximize();  // This maximizes the browser window
        console.log('Browser window maximized to full screen.');

        // Step 2: Load the webpage where your React app is running
        await driver.get('http://localhost:3000');  // Adjust with your local URL or deployed URL

        // Step 3: Wait for the map container to be present
        const mapContainer = await driver.wait(until.elementLocated(By.id('homepage-map')), 10000);
        assert.isNotNull(mapContainer, 'Map is displayed');
        console.log('Map is displayed.');

        // Step 4: Open the "Add Weather Report" options
        const addWeatherReportsButton = await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
        await addWeatherReportsButton.click();  // Click to open the weather report options
        console.log('AddWeatherReports button clicked, list of reports shown.');

        // Step 5: Select Earthquake (or any other disaster)
        const earthquakeIcon = await driver.wait(until.elementLocated(By.xpath("//li[text()='🌍 Earthquake']")), 10000);
        await earthquakeIcon.click();  // Click on Earthquake
        console.log('Earthquake icon clicked.');

        // Step 6: Wait for the WeatherReportForm to load (check if form is visible)
        const formVisible = await driver.wait(until.elementLocated(By.className('weather-report-form')), 10000);
        console.log('Weather report form loaded.');

        // Step 7: Simulate clicking on the map to select a location
        const mapElement = await driver.findElement(By.id('map'));
        console.log('Waiting for map interaction...');
        await driver.actions().move({ origin: mapElement }).click().perform();  // Click on the map

        // Step 8: Wait for the location to update in the form
        const locationInputField = await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Enter location']")), 10000);

        // Wait for the location field to be populated with location data
        let locationValue;
        await driver.wait(async function () {
            locationValue = await locationInputField.getAttribute('value');
            return locationValue && locationValue.includes(',');
        }, 10000);

        console.log('Location after clicking on map:', locationValue);

        // Step 9: Verify the location is set correctly (example: assert it contains 'London' or another location)
        assert.include(locationValue, 'London', 'Location is correctly set on the map.');
        console.log('Location verified.');

        // Step 10: Fill out the form
        await driver.findElement(By.xpath("//textarea[@placeholder='Describe the situation']")).sendKeys('Severe earthquake in London');

        // Step 11: Ensure the Submit button is scrolled into view and clickable
        const submitButton = await driver.findElement(By.xpath("//button[text()='Submit']"));

        // Ensure the button is scrolled into view before clicking
        await driver.executeScript('arguments[0].scrollIntoView(true);', submitButton);
        await driver.sleep(500);  // Adding a short delay to allow for visual updates after scrolling

        // Click the Submit button
        await submitButton.click();  
        console.log('Weather report submitted.');

        // Step 12: Wait for the form to be closed and return to the main page
        await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
        console.log('Returned to the main page after form submission.');

    } catch (error) {
        console.log('Test failed due to error: ' + error);
        assert.fail('Test failed due to error: ' + error);
    } finally {
        await driver.quit();
    }
})();
